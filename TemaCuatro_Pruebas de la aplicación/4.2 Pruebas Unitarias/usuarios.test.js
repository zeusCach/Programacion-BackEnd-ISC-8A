import { jest, describe, test, expect, beforeEach, beforeAll } from '@jest/globals';

// ─── Mock ANTES de importar app ────────────────────────────────────────────
const mockFind             = jest.fn();
const mockFindById         = jest.fn();
const mockCreate           = jest.fn();
const mockFindByIdAndUpdate= jest.fn();
const mockFindByIdAndDelete= jest.fn();

jest.unstable_mockModule('./models/usuario.model.js', () => ({
    default: {
        find:              mockFind,
        findById:          mockFindById,
        create:            mockCreate,
        findByIdAndUpdate: mockFindByIdAndUpdate,
        findByIdAndDelete: mockFindByIdAndDelete,
    },
}));

// ─── Importación dinámica DESPUÉS del mock ─────────────────────────────────
let request, app;
beforeAll(async () => {
    const supertest = await import('supertest');
    const appModule  = await import('./app.js');
    request = supertest.default;
    app     = appModule.default;
});

// ─── Datos de prueba ───────────────────────────────────────────────────────
const usuarioMock = {
    _id:   '64a1f2c3e4b0a1b2c3d4e5f6',
    name:  'Juan Pérez',
    age:   25,
    email: 'juan@example.com',
};

const usuarioMock2 = {
    _id:   '64a1f2c3e4b0a1b2c3d4e5f7',
    name:  'María López',
    age:   30,
    email: 'maria@example.com',
};

beforeEach(() => jest.clearAllMocks());

// ══════════════════════════════════════════════════════════════════════════
//  GET /
// ══════════════════════════════════════════════════════════════════════════
describe('GET /', () => {
    test('debe retornar mensaje de bienvenida', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Welcome to my API CRUD');
    });
});

// ══════════════════════════════════════════════════════════════════════════
//  GET /usuarios
// ══════════════════════════════════════════════════════════════════════════
describe('GET /usuarios', () => {
    test('debe retornar lista de usuarios con status 200', async () => {
        mockFind.mockResolvedValue([usuarioMock, usuarioMock2]);

        const res = await request(app).get('/usuarios');

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toBe('Juan Pérez');
        expect(mockFind).toHaveBeenCalledTimes(1);
    });

    test('debe retornar lista vacía si no hay usuarios', async () => {
        mockFind.mockResolvedValue([]);

        const res = await request(app).get('/usuarios');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('debe retornar status 500 si ocurre un error en la DB', async () => {
        mockFind.mockRejectedValue(new Error('DB error'));

        const res = await request(app).get('/usuarios');

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});

// ══════════════════════════════════════════════════════════════════════════
//  GET /usuario/:id
// ══════════════════════════════════════════════════════════════════════════
describe('GET /usuario/:id', () => {
    test('debe retornar un usuario por id con status 200', async () => {
        mockFindById.mockResolvedValue(usuarioMock);

        const res = await request(app).get(`/usuario/${usuarioMock._id}`);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Juan Pérez');
        expect(res.body.email).toBe('juan@example.com');
        expect(mockFindById).toHaveBeenCalledWith(usuarioMock._id);
    });

    test('debe retornar status 500 si ocurre un error', async () => {
        mockFindById.mockRejectedValue(new Error('DB error'));

        const res = await request(app).get(`/usuario/${usuarioMock._id}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});

// ══════════════════════════════════════════════════════════════════════════
//  POST /usuario
// ══════════════════════════════════════════════════════════════════════════
describe('POST /usuario', () => {
    test('debe crear un usuario y retornar status 201', async () => {
        mockCreate.mockResolvedValue(usuarioMock);

        const res = await request(app)
            .post('/usuario')
            .send({ name: 'Juan Pérez', age: 25, email: 'juan@example.com' });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Juan Pérez');
        expect(res.body.email).toBe('juan@example.com');
        expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    test('debe retornar status 500 si falla la creación', async () => {
        mockCreate.mockRejectedValue(new Error('Validation error'));

        const res = await request(app)
            .post('/usuario')
            .send({ name: 'Test' });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});

// ══════════════════════════════════════════════════════════════════════════
//  PUT /usuario/:id
// ══════════════════════════════════════════════════════════════════════════
describe('PUT /usuario/:id', () => {
    test('debe actualizar un usuario y retornar status 202', async () => {
        const usuarioActualizado = { ...usuarioMock, age: 26 };

        mockFindByIdAndUpdate.mockResolvedValue(usuarioMock);
        mockFindById.mockResolvedValue(usuarioActualizado);

        const res = await request(app)
            .put(`/usuario/${usuarioMock._id}`)
            .send({ age: 26 });

        expect(res.status).toBe(202);
        expect(res.body.age).toBe(26);
        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(usuarioMock._id, { age: 26 });
    });

    test('debe retornar status 404 si el usuario no existe', async () => {
        mockFindByIdAndUpdate.mockResolvedValue(null);

        const res = await request(app)
            .put(`/usuario/${usuarioMock._id}`)
            .send({ age: 30 });

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
    });

    test('debe retornar status 500 si ocurre un error en la DB', async () => {
        mockFindByIdAndUpdate.mockRejectedValue(new Error('DB error'));

        const res = await request(app)
            .put(`/usuario/${usuarioMock._id}`)
            .send({ age: 26 });

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});

// ══════════════════════════════════════════════════════════════════════════
//  DELETE /usuario/:id
// ══════════════════════════════════════════════════════════════════════════
describe('DELETE /usuario/:id', () => {
    test('debe eliminar un usuario y retornar status 200', async () => {
        mockFindByIdAndDelete.mockResolvedValue(usuarioMock);

        const res = await request(app).delete(`/usuario/${usuarioMock._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('mensaje', 'Usuario eliminado correctamente');
        expect(mockFindByIdAndDelete).toHaveBeenCalledWith(usuarioMock._id);
    });

    test('debe retornar status 404 si el usuario no existe', async () => {
        mockFindByIdAndDelete.mockResolvedValue(null);

        const res = await request(app).delete(`/usuario/${usuarioMock._id}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Usuario no encontrado');
    });

    test('debe retornar status 500 si ocurre un error en la DB', async () => {
        mockFindByIdAndDelete.mockRejectedValue(new Error('DB error'));

        const res = await request(app).delete(`/usuario/${usuarioMock._id}`);

        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});
