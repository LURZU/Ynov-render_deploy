const axios = require('axios');

const apiUrl = 'http://localhost:3000/masks';

async function createMask() {
    try {
        const response = await axios.post(apiUrl, {
            name: 'Test Mask',
            description: 'This is a test mask',
            mask_json: '{"type":"test"}'
        });
        console.log('Create Mask: OK');
        return response.data;
    } catch (error) {
        console.error('Create Mask: Failed');
    }
}

async function getMask(id) {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        console.log('Get Mask: OK');
        return response.data;
    } catch (error) {
        console.error('Get Mask: Failed');
    }
}

async function updateMask(id) {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, {
            name: 'Updated Test Mask',
            description: 'Updated description',
            mask_json: '{"type":"updated"}'
        });
        console.log('Update Mask: OK');
        return response.data;
    } catch (error) {
        console.error('Update Mask: Failed');
    }
}

async function deleteMask(id) {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        console.log('Delete Mask: OK');
    } catch (error) {
        console.error('Delete Mask: Failed');
    }
}

async function testCRUDOperations() {
    console.log('Starting CRUD operations test...');

    const createdMask = await createMask();
    if (!createdMask) {
        console.error('Stopping test due to failure in creation.');
        return;
    }

    await getMask(createdMask.id);
    await updateMask(createdMask.id);
    await deleteMask(createdMask.id);
}

testCRUDOperations();
