const express = require('express');


app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.listen(PORT, () => {
    console.log("test", PORT);
})