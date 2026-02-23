import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { setupAuth, crypto } from "./auth";
import passport from "passport";
import { insertUserSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Middleware для проверки аутентификации
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Настройка аутентификации
  setupAuth(app);

  // Регистрация
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: fromZodError(result.error).message,
        });
      }

      const { username, password } = result.data;

      // Проверка существующего пользователя
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Хеширование пароля
      const hashedPassword = await crypto.hash(password);

      // Создание пользователя
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      });

      // Автоматический логин после регистрации
      req.login({ id: user.id, username: user.username }, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: "Registration successful",
          user: { id: user.id, username: user.username },
        });
      });
    } catch (error) {
      next(error);
    }
  });

  // Логин
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Login failed" });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: "Login successful",
          user: { id: user.id, username: user.username },
        });
      });
    })(req, res, next);
  });

  // Логаут
  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Получение текущего пользователя
  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({ user: req.user });
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  // Пример защищенного роута
  app.get("/api/protected", isAuthenticated, (req, res) => {
    res.json({
      message: "This is a protected route",
      user: req.user,
    });
  });

  return httpServer;
}
