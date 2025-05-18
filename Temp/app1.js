//For only get request
Ext.application({
    name: 'UserManagement',

    launch: function () {
        // Define User model
        Ext.define('UserManagement.model.User', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'phone', type: 'string' }
            ]
        });

        // Create User store
        var userStore = Ext.create('Ext.data.Store', {
            model: 'UserManagement.model.User',
            proxy: {
                type: 'ajax',
                url: 'http://localhost:8080/api/users',
                reader: {
                    type: 'json',
                    rootProperty: ''
                }
            },
            autoLoad: true
        });

        // Create grid to display users
        Ext.create('Ext.grid.Panel', {
            title: 'User List',
            store: userStore,
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: 'Name', dataIndex: 'name', flex: 1 },
                { text: 'Email', dataIndex: 'email', flex: 1 },
                { text: 'Phone', dataIndex: 'phone', width: 120 }
            ],
            height: 400,
            width: '100%',
            renderTo: Ext.getBody()
        });
    }
});
