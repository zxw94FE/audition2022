



const Template = (args) => {
    console.log(args, 'args')
    return args;
    };

const Default = Template.bind({});

const args = {
    task: {
        id: '1',
    },
};

console.log(Default(args), 'default')
