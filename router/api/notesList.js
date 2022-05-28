const {Router} = require('express')
const itemListSh = require('../../models/itemList')

const router = Router()

// "/" - требудет замены, на данном этапе нет страницы 09.04.22 19:00

router.get('/', async (req, res)=>{
    try{
    const notesListItems = await itemListSh.find()
    if(!notesListItems) throw new Error('Not listDate')
    const sorted = notesListItems.sort((a,b) =>{
        return new Date(a.data).getTime()
    })
    res.status(200).json(sorted)
    }catch (e){
        res.status(500).json({message: e.message})
    }
})

router.post('/', async (req, res)=>{
    const newNotesListItem = new itemListSh(req.body)
    try{
        const notesListItem = await newNotesListItem.save()
        if(!notesListItem) throw new Error('wrong save')
        res.status(200).json(notesListItem)
    }catch(e){
        res.status(500).json({ message: e.message })
    }
})

router.put('/:id', async (req,res)=>{
    const {id} = req.params
    try{
        const response = await itemListSh.findByIdAndUpdate(id, req.body)
        if(!response) throw Error('wrong')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    }catch (e){
        res.status(500).json({ message: e.message })
    }
})

router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    try {
        const removed = itemListSh.findByIdAndDelete(id)
        if(!removed) throw Error('wrong')
        res.status(200).json(removed)
    }catch (e){
        res.status(500).json({ message: e.message })
    }
})

module.exports = router;