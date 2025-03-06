const express = require('express');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Cadastro de usuário
router.post('/cadastro', [
    body('nome').not().isEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
], async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }

    const { nome, email, senha } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) return res.status(400).json({ msg: 'Usuário já existe' });

        const senhaHash = new Usuario().gerarHash(senha);

        usuario = new Usuario({ nome, email, senha: senhaHash });
        await usuario.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ msg: 'Erro no servidor', erro: error.message });
    }
});

// Login do usuário
router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
], async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }

    const { email, senha } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        const senhaValida = usuario.compararSenha(senha);
        if (!senhaValida) {
            return res.status(400).json({ msg: 'Senha inválida' });
        }

        const payload = { usuarioId: usuario._id };
        const token = jwt.sign(payload, 'secreta', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ msg: 'Erro no servidor', erro: error.message });
    }
});

module.exports = router;