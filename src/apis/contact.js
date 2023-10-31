import axios from "axios";

const baseURL =  "https://syncall.com.ng/api";

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