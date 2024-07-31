const { users } = require("./server");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get(`/users`, (req, res) => {
    if (!users.length) {
        return res.status(400).json({
            msg: "Malumotlar topilmadi",
            variant: "error",
            payload: null,
        });
    }
    res.status(200).json({
        msg: "Barcha malumotlar",
        variant: "success",
        payload: users,
        total: users.length,
    });
});

app.post(`/users`, (req, res) => {
    let existUser = users.find((user) => user.username === req.body.username);
    if (existUser) {
        return res.status(400).json({
            msg: "Bunday username mavjud",
            variant: "warning",
            payload: null,
        });
    }

    let newUser = {
        id: new Date().getTime(),
        ...req.body,
    };
    users.push(newUser);
    res.status(201).json({
        msg: "Yaratildi",
        variant: "success",
        payload: users,
    });
});

app.delete(`/users/:id`, (req, res) => {
    let userIndex = users.findIndex(
        (user) => user.id === parseInt(req.params.id)
    );
    if (userIndex < 0) {
        return res.status(400).json({
            msg: "Bunday user topilmadi",
            variant: "error",
            payload: null,
        });
    }
    users.splice(userIndex, 1);
    res.status(200).json({
        msg: "User o'chirildi",
        variant: "success",
        payload: null,
    });
});

app.put(`/users/:id`, (req, res) => {
    let id = +req.params.id;
    let userIndex = users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
        return res.status(400).json({
            msg: "Bunday user topilmadi",
            variant: "error",
            payload: null,
        });
    }
    let updateUser = {
        id,
        ...req.body,
    };
    users.splice(userIndex, 1, updateUser);
    res.status(200).json({
        msg: "User O'zgartirildi",
        variant: "success",
        payload: updateUser,
    });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`${PORT} is Listening`));
