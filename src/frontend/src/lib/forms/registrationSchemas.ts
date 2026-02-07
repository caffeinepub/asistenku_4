export interface ClientFormData {
    name: string;
    email: string;
    whatsapp: string;
    company: string;
}

export interface PartnerFormData {
    name: string;
    email: string;
    whatsapp: string;
    skills: string;
    domicile: string;
}

export const clientFormFields = [
    { name: 'name', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap Anda', type: 'text', required: true },
    { name: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email', required: true },
    { name: 'whatsapp', label: 'WhatsApp', placeholder: '+62 812 3456 7890', type: 'tel', required: true },
    { name: 'company', label: 'Perusahaan/Bisnis', placeholder: 'Nama perusahaan atau bisnis Anda', type: 'text', required: true }
];

export const partnerFormFields = [
    { name: 'name', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap Anda', type: 'text', required: true },
    { name: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email', required: true },
    { name: 'whatsapp', label: 'WhatsApp', placeholder: '+62 812 3456 7890', type: 'tel', required: true },
    { name: 'skills', label: 'Keahlian', placeholder: 'Keahlian utama Anda', type: 'text', required: true },
    { name: 'domicile', label: 'Domisili', placeholder: 'Kota tempat tinggal Anda', type: 'text', required: true }
];
