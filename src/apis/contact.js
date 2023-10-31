import axios from "axios";

const baseURL =  "http://127.0.0.1:8000/api";

const client = axios.create({
    baseURL,
});

const createContact = (body) => {
    return client.post("create-contact", {...body});
};

const getContacts = () => {
    return client.get("get-contacts");
};

const getAllContacts = () => {
    return client.get("get-all-contacts");
}

const viewContact = (id) => {
    return client.get(`view-contact/${id}`);
}

const getHistory = () => {
    return client.get("all-history");
}

const contact_api = {
    createContact,
    getContacts,
    getAllContacts,
    viewContact,
    getHistory
}

export default contact_api;