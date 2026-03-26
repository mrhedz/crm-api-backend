import { Request, Response } from "express";
import { z } from "zod";
import pool from "../config/db";

const createClientSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.email(),
  status: z.enum(["Nuevo", "Contactado", "Cerrado"]),
});

const updateClientSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.email(),
  status: z.enum(["Nuevo", "Contactado", "Cerrado"]),
});

const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const getClients = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(
      "SELECT * FROM clients ORDER BY id DESC"
    );

    res.status(200).json({
      message: "Clients fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getClientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedId = idSchema.safeParse(req.params);

    if (!parsedId.success) {
      res.status(400).json({
        message: "Invalid client id",
        errors: parsedId.error.flatten(),
      });
      return;
    }

    const { id } = parsedId.data;

    const result = await pool.query(
      "SELECT * FROM clients WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "Client not found",
      });
      return;
    }

    res.status(200).json({
      message: "Client fetched successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = createClientSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid client data",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const { name, email, status } = parsed.data;

    const result = await pool.query(
      `INSERT INTO clients (name, email, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, status]
    );

    res.status(201).json({
      message: "Client created successfully",
      data: result.rows[0],
    });
  } catch (error: unknown) {
    const pgError = error as { code?: string; detail?: string; message?: string };

    if (pgError.code === "23505") {
      res.status(409).json({
        message: "Email already exists",
        detail: pgError.detail ?? null,
      });
      return;
    }

    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedId = idSchema.safeParse(req.params);

    if (!parsedId.success) {
      res.status(400).json({
        message: "Invalid client id",
        errors: parsedId.error.flatten(),
      });
      return;
    }

    const parsedBody = updateClientSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({
        message: "Invalid client data",
        errors: parsedBody.error.flatten(),
      });
      return;
    }

    const { id } = parsedId.data;
    const { name, email, status } = parsedBody.data;

    const result = await pool.query(
      `UPDATE clients
       SET name = $1, email = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, status, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "Client not found",
      });
      return;
    }

    res.status(200).json({
      message: "Client updated successfully",
      data: result.rows[0],
    });
  } catch (error: unknown) {
    const pgError = error as { code?: string; detail?: string; message?: string };

    if (pgError.code === "23505") {
      res.status(409).json({
        message: "Email already exists",
        detail: pgError.detail ?? null,
      });
      return;
    }

    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedId = idSchema.safeParse(req.params);

    if (!parsedId.success) {
      res.status(400).json({
        message: "Invalid client id",
        errors: parsedId.error.flatten(),
      });
      return;
    }

    const { id } = parsedId.data;

    const result = await pool.query(
      "DELETE FROM clients WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "Client not found",
      });
      return;
    }

    res.status(200).json({
      message: "Client deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};