import { Router } from 'express'

// controllers
import EmailController from '../controllers/email.controller'

const router = Router()

// rotas de email
router.get('/emails', EmailController.buscarEmails)
router.get('/get-email-by-name/:name', EmailController.pesquisarEmailPorNome)
router.post('/add-email', EmailController.adicionarEmail)
router.put('/update-email/:id', EmailController.atualizarEmail)
router.delete('/delete-email/:id', EmailController.deletarEmail)

export default router
