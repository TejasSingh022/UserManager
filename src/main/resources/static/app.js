Ext.application({
    name: 'UserManagement',
    
    // Define the launch function
    launch: function() {
        // Create User Model
        Ext.define('UserManagement.model.User', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'phone', type: 'string' }
            ],
            idProperty: 'id'
        });
        
        // Create User Store
        var userStore = Ext.create('Ext.data.Store', {
            model: 'UserManagement.model.User',
            proxy: {
                type: 'ajax',
                url: 'http://localhost:8080/api/users',
                reader: {
                    type: 'json',
                    rootProperty: ''  // No root property as our API returns array directly
                },
                writer: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
        // Create User Form
        var userForm = Ext.create('Ext.form.Panel', {
            title: 'User Details',
            bodyPadding: 10,
            width: 400,
            
            // Fields will be arranged in a column layout
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            
            // The form fields
            items: [{
                xtype: 'hiddenfield',
                name: 'id'
            }, {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'Name',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email',
                vtype: 'email',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'phone',
                fieldLabel: 'Phone',
                allowBlank: false
            }],
            
            // Form buttons
            buttons: [{
                text: 'Save',
                formBind: true,
                handler: function() {
                    var form = this.up('form').getForm();
                    var record = form.getRecord();
                    var values = form.getValues();
                    
                    // If we have a record, update it
                    if (record) {
                        record.set(values);
                        
                        // AJAX request to update user
                        Ext.Ajax.request({
                            url: 'http://localhost:8080/api/users/' + record.get('id'),
                            method: 'PUT',
                            jsonData: record.data,
                            success: function(response) {
                                userStore.load();
                                form.reset();
                                Ext.Msg.alert('Success', 'User updated successfully');
                            },
                            failure: function(response) {
                                Ext.Msg.alert('Error', 'Failed to update user');
                            }
                        });
                    } 
                    // Otherwise create a new user
                    else {
                        var values = form.getValues();

                        // Remove id if it's empty or "null"
                        if (values.id && isNaN(parseInt(values.id))) {
                            delete values.id;
                        } else {
                            values.id = parseInt(values.id); // ensure it's an integer if present
                        }

                        var newUser = Ext.create('UserManagement.model.User', values);
                        delete newUser.data.id;

                        Ext.Ajax.request({
                            url: 'http://localhost:8080/api/users',
                            method: 'POST',
                            jsonData: newUser.data,
                            success: function(response) {
                                userStore.load();
                                form.reset();
                                Ext.Msg.alert('Success', 'User created successfully');
                            },
                            failure: function(response) {
                                Ext.Msg.alert('Error', 'Failed to create user');
                            }
                        });
                    }
                }
            }, {
                text: 'Cancel',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }]
        });
        
        // Create User Grid
        var userGrid = Ext.create('Ext.grid.Panel', {
            title: 'User Management',
            store: userStore,
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: 'Name', dataIndex: 'name', flex: 1 },
                { text: 'Email', dataIndex: 'email', flex: 1 },
                { text: 'Phone', dataIndex: 'phone', width: 120 },
                {
                    xtype: 'actioncolumn',
                    width: 80,
                    items: [{
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit',
                        handler: function(grid, rowIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            userForm.getForm().loadRecord(record);
                        }
                    }, {
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            
                            Ext.Msg.confirm('Confirm', 'Are you sure you want to delete this user?', function(btn) {
                                if (btn === 'yes') {
                                    // AJAX request to delete user
                                    Ext.Ajax.request({
                                        url: 'http://localhost:8080/api/users/' + record.get('id'),
                                        method: 'DELETE',
                                        success: function(response) {
                                            userStore.load();
                                            Ext.Msg.alert('Success', 'User deleted successfully');
                                        },
                                        failure: function(response) {
                                            Ext.Msg.alert('Error', 'Failed to delete user');
                                        }
                                    });
                                }
                            });
                        }
                    }]
                }
            ],
            height: 400,
            width: '100%',
            
            // Top toolbar with Add button
            tbar: [{
                text: 'Add User',
                handler: function() {
                    userForm.getForm().reset();
                }
            }]
        });
        
        // Create main container with layout
        Ext.create('Ext.container.Container', {
            renderTo: Ext.getBody(),
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [userGrid, userForm]
        });
    }
});