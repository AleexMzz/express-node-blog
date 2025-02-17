import { Router } from 'express';
import { CategoryController } from '@controllers/categories.controller';
import { CreateCategoryDto } from '@dtos/categories.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.category.getCategories);
    this.router.get(`${this.path}/:id`, this.category.getCategoryById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCategoryDto), this.category.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateCategoryDto, true), this.category.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.category.deleteCategory);
  }
}
