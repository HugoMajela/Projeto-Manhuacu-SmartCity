const mongoose = require('mongoose');
const crypto = require('crypto');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
}, { timestamps: true });

UsuarioSchema.methods.gerarHash = function(senha) {
    return crypto.createHash('sha256').update(senha).digest('hex');
};

UsuarioSchema.methods.compararSenha = function(senha) {
    const hashGerado = this.gerarHash(senha);
    return hashGerado === this.senha;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);