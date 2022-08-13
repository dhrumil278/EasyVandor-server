import express from 'express';

const router = express.Router();

router.get('/', (req,res)=>{
    res.json({mssg: 'welcom to easy vander'})
})

export default router;