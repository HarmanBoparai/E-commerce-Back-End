const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
    const allCategoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
      res.status(200).json(allCategoriesData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/:id', async (req, res) => {
  // find one category by its `id` value  
  // be sure to include its associated Products
    try {
      const allCategoriesData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
});
if (!allCategoriesData) {
  res.status(404).json({ message: 'No Category found with this id!' });
  return;
}
res.status(200).json(allCategoriesData);
} catch (err) {
res.status(500).json(err);
}
});
router.post('/', async(req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.findByPk(req.params.id);
    updateCategory.category_name = req.body.category_name;
    await updateCategory.save()
    res.status(200).json("updated the Category Successfully");
  } catch (err) {
    res.status(404).json("No category id found")
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const Deletecategory= await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!Deletecategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json( Deletecategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;