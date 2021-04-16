const express    = require("express"),
      router     = express.Router({mergeParams : true});

router.get('/', (req, res) => {
    let ans = '',
        quote = "Your BMI Result will appear here...";
    res.render('app', { ans : ans, quote : quote });
});

router.post('/calculate-BMI', (req, res) => {
    let ans = 0;
    if(req.body.pound){
        let pound  = req.body.pound * 703,
            inch   = req.body.feet * 12 + parseInt(req.body.inch);

        ans = pound / inch ** 2;
    } else {
        let weight = req.body.kg,
            height = req.body.cm / 100;

        ans = weight / height ** 2;
    }
    ans = ans.toFixed(2),
    quote = "Your BMI is NORMAL, Stay Healthy and Fit.";

    if(ans < 18){
        quote = "UnderWeight!!!, Start consuming Healthy food & gain some weight.";
    } else if(ans > 18 && ans < 25) {
        quote = "Your BMI is NORMAL, Stay Healthy and Fit.";
    } else if(ans > 25 && ans < 30) {
        quote = "You're Overweight, Loose some Weight & Be Healthy.";
    } else if(ans > 30) {
        quote = "Obesity!!!, Loose some Weight & Be Healthy.";
    } 
     res.render('app', { ans : ans, quote : quote });
});


module.exports = router;