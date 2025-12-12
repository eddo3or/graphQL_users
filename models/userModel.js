const users = [
    {id: "1", name: "Bob", age: 30, email: "i@a.com"},
    {id: "2", name: "Alice", age: 27, email: "a@b.com"},
];

 const getAll = () => {
    return users;
}

 const getById = (id) => {
    return users.find(user => user.id === id) || null;
}

 const create = (name, email, age) => {
    const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        age
    };

    users.push(newUser);
    return newUser;
}

 const remove = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const deleted = users.splice(index, 1)[0];
    return deleted;
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}
