// Frontend-only i18n helper with EN/ID support
// Default locale: English
// Storage key: "asistenku_locale"

export type Locale = 'en' | 'id';

export type TranslationKey =
  // Navigation
  | 'nav_home'
  | 'nav_services'
  | 'nav_join'
  | 'nav_register'
  | 'nav_have_account'
  | 'nav_login'
  // Landing page
  | 'hero_title'
  | 'hero_subtitle'
  | 'hero_cta_start'
  | 'hero_cta_login'
  | 'unique_needs_title'
  | 'unique_needs_desc'
  | 'services_title'
  | 'services_subtitle'
  | 'service_tenang_title'
  | 'service_tenang_desc'
  | 'service_tenang_price'
  | 'service_rapi_title'
  | 'service_rapi_desc'
  | 'service_rapi_price'
  | 'service_fokus_title'
  | 'service_fokus_desc'
  | 'service_fokus_price'
  | 'service_jaga_title'
  | 'service_jaga_desc'
  | 'service_jaga_price'
  | 'service_cta'
  | 'compare_title'
  | 'compare_alone_title'
  | 'compare_alone_1'
  | 'compare_alone_2'
  | 'compare_alone_3'
  | 'compare_alone_4'
  | 'compare_together_title'
  | 'compare_together_1'
  | 'compare_together_2'
  | 'compare_together_3'
  | 'compare_together_4'
  | 'compare_cta'
  | 'faq_title'
  | 'faq_q1'
  | 'faq_a1'
  | 'faq_q2'
  | 'faq_a2'
  | 'faq_q3'
  | 'faq_a3'
  | 'join_title'
  | 'join_benefit_1'
  | 'join_benefit_2'
  | 'join_benefit_3'
  | 'join_benefit_4'
  | 'join_cta'
  // Internal access
  | 'internal_access_title'
  | 'internal_access_hint'
  | 'access_code_label'
  | 'continue'
  | 'back'
  | 'invalid_code_ui'
  // Login
  | 'login_title'
  | 'login_subtitle'
  | 'login_as_client'
  | 'login_as_partner'
  | 'workspace_btn'
  | 'public_mismatch_ui'
  // Registration
  | 'register_title'
  | 'register_subtitle'
  | 'tab_client'
  | 'tab_partner'
  | 'register_button'
  | 'registering'
  | 'logging_in'
  | 'login_required_hint'
  | 'already_have_account'
  | 'registration_success_title'
  | 'registration_success_client'
  | 'registration_success_partner'
  | 'your_id'
  | 'go_to_dashboard'
  | 'error_already_registered'
  | 'error_registration_failed'
  // Internal gate guard
  | 'internal_locked_title'
  | 'internal_locked_hint'
  | 'go_to_internal'
  // Access gate
  | 'verify_access_title'
  | 'verify_access_hint'
  | 'verify_and_open'
  // Client dashboard
  | 'workspace_title'
  | 'client_greeting'
  | 'client_greeting_desc'
  | 'tab_summary'
  | 'tab_profile'
  | 'tab_services'
  | 'tab_my_requests'
  | 'tab_delegation'
  | 'summary_title'
  | 'summary_desc'
  | 'summary_welcome'
  | 'profile_title'
  | 'profile_desc'
  | 'delegation_title'
  // Service Request
  | 'service_request_form_title'
  | 'service_request_form_desc'
  | 'service_request_title_label'
  | 'service_request_title_placeholder'
  | 'service_request_description_label'
  | 'service_request_description_placeholder'
  | 'service_request_type_label'
  | 'service_request_deadline_label'
  | 'service_request_info_note'
  | 'service_request_submit'
  | 'service_request_submitting'
  | 'service_request_list_title'
  | 'service_request_list_desc'
  | 'service_request_list_empty'
  | 'request_type_normal'
  | 'request_type_normal_label'
  | 'request_type_normal_helper'
  | 'request_type_priority'
  | 'request_type_priority_label'
  | 'request_type_priority_helper'
  | 'request_type_urgent'
  | 'request_type_urgent_label'
  | 'request_type_urgent_helper'
  | 'status_requested'
  | 'deadline_label'
  // Partner dashboard
  | 'partner_greeting'
  | 'partner_greeting_desc'
  | 'partner_summary_title'
  | 'partner_summary_desc'
  | 'partner_summary_welcome'
  | 'partner_profile_title'
  | 'partner_profile_desc'
  | 'menu_summary'
  | 'menu_profile'
  | 'menu_work'
  | 'menu_income'
  | 'partner_pending_alert'
  | 'partner_work_title'
  | 'partner_work_desc'
  | 'partner_financial_title'
  | 'partner_financial_desc'
  | 'partner_balance_title'
  | 'partner_balance_desc'
  | 'partner_cert_title'
  | 'partner_cert_desc'
  // Admin dashboard
  | 'admin_summary_title'
  | 'admin_summary_desc'
  | 'admin_summary_welcome'
  // Asistenmu dashboard
  | 'asistenmu_workspace_title'
  | 'asistenmu_dashboard_title'
  | 'asistenmu_dashboard_desc'
  | 'asistenmu_dashboard_title_card'
  | 'asistenmu_dashboard_desc_card'
  | 'asistenmu_dashboard_placeholder'
  // Finance dashboard
  | 'finance_workspace_title'
  | 'finance_dashboard_title'
  | 'finance_dashboard_desc'
  | 'finance_dashboard_title_card'
  | 'finance_dashboard_desc_card'
  | 'finance_dashboard_placeholder'
  // Management dashboard
  | 'management_workspace_title'
  | 'management_dashboard_title'
  | 'management_dashboard_desc'
  | 'management_dashboard_title_card'
  | 'management_dashboard_desc_card'
  | 'management_dashboard_placeholder'
  // Supervisor dashboard
  | 'supervisor_workspace_title'
  | 'supervisor_dashboard_title'
  | 'supervisor_dashboard_desc'
  | 'supervisor_dashboard_title_card'
  | 'supervisor_dashboard_desc_card'
  | 'supervisor_dashboard_placeholder'
  // Superadmin dashboard
  | 'superadmin_summary_title'
  | 'superadmin_summary_desc'
  | 'superadmin_summary_welcome'
  | 'superadmin_audit_title'
  | 'superadmin_audit_desc'
  | 'task_management_title'
  | 'task_management_desc'
  | 'client_work_requests_title'
  | 'client_work_requests_desc'
  | 'no_requests_yet'
  // Common
  | 'loading'
  | 'error'
  | 'success';

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_services: 'Services',
    nav_join: 'Join as Partner',
    nav_register: 'Register',
    nav_have_account: 'Already have an account?',
    nav_login: 'Login',
    // Landing page
    hero_title: 'Your Personal Assistant for Business Growth',
    hero_subtitle: 'Focus on what matters. Let Asistenku handle the rest.',
    hero_cta_start: 'Get Started',
    hero_cta_login: 'Login',
    unique_needs_title: 'Every business has unique needs',
    unique_needs_desc: 'Choose the service package that fits your business stage and goals.',
    services_title: 'Our Services',
    services_subtitle: 'Flexible packages designed for your business needs',
    service_tenang_title: 'TENANG',
    service_tenang_desc: 'Perfect for startups and small businesses. Get essential administrative support to keep your business running smoothly.',
    service_tenang_price: 'Starting from IDR 2.5M/month',
    service_rapi_title: 'RAPI',
    service_rapi_desc: 'Ideal for growing businesses. Comprehensive support for operations, documentation, and customer service.',
    service_rapi_price: 'Starting from IDR 5M/month',
    service_fokus_title: 'FOKUS',
    service_fokus_desc: 'For established businesses. Dedicated team for project management, research, and strategic initiatives.',
    service_fokus_price: 'Starting from IDR 10M/month',
    service_jaga_title: 'JAGA',
    service_jaga_desc: 'Premium service for enterprises. Full-time dedicated assistant for executive support and business development.',
    service_jaga_price: 'Starting from IDR 20M/month',
    service_cta: 'Contact Us',
    compare_title: 'Why Choose Asistenku?',
    compare_alone_title: 'Working Alone',
    compare_alone_1: 'Overwhelmed with admin tasks',
    compare_alone_2: 'Missing growth opportunities',
    compare_alone_3: 'Inconsistent documentation',
    compare_alone_4: 'Limited capacity',
    compare_together_title: 'With Asistenku',
    compare_together_1: 'Focus on core business',
    compare_together_2: 'Capture every opportunity',
    compare_together_3: 'Professional documentation',
    compare_together_4: 'Scalable support',
    compare_cta: 'Start Your Journey',
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'How does Asistenku work?',
    faq_a1: 'Simply choose your service package, and we will match you with a dedicated assistant who understands your business needs.',
    faq_q2: 'Can I change my package later?',
    faq_a2: 'Yes! You can upgrade or adjust your package as your business grows.',
    faq_q3: 'What if I need specialized skills?',
    faq_a3: 'Our team includes specialists in various fields. We will match you with the right expertise.',
    join_title: 'Join Our Partner Network',
    join_benefit_1: 'Flexible working hours',
    join_benefit_2: 'Competitive compensation',
    join_benefit_3: 'Skill development opportunities',
    join_benefit_4: 'Supportive community',
    join_cta: 'Apply Now',
    // Internal access
    internal_access_title: 'Internal Access',
    internal_access_hint: 'Enter your access code to continue',
    access_code_label: 'Access Code',
    continue: 'Continue',
    back: 'Back',
    invalid_code_ui: 'Invalid access code. Please try again.',
    // Login
    login_title: 'Welcome Back',
    login_subtitle: 'Choose your workspace to continue',
    login_as_client: 'Login as Client',
    login_as_partner: 'Login as Partner',
    workspace_btn: 'My Workspace',
    public_mismatch_ui: 'Your account role does not match. Please use the correct login option.',
    // Registration
    register_title: 'Create Your Account',
    register_subtitle: 'Join Asistenku today',
    tab_client: 'Client',
    tab_partner: 'Partner',
    register_button: 'Register',
    registering: 'Registering...',
    logging_in: 'Logging in...',
    login_required_hint: 'Please login with Internet Identity first',
    already_have_account: 'Already have an account?',
    registration_success_title: 'Registration Successful!',
    registration_success_client: 'Your client account has been created successfully.',
    registration_success_partner: 'Your partner application has been submitted. We will review and contact you soon.',
    your_id: 'Your ID',
    go_to_dashboard: 'Go to Dashboard',
    error_already_registered: 'You already have an account. Please login instead.',
    error_registration_failed: 'Registration failed. Please try again.',
    // Internal gate guard
    internal_locked_title: 'Access Required',
    internal_locked_hint: 'You need to enter the internal access code first',
    go_to_internal: 'Go to Internal Access',
    // Access gate
    verify_access_title: 'Verify Access',
    verify_access_hint: 'Click the button below to verify your access',
    verify_and_open: 'Verify and Open',
    // Client dashboard
    workspace_title: 'Workspace',
    client_greeting: 'Hello, {name}!',
    client_greeting_desc: 'Welcome to your workspace',
    tab_summary: 'Summary',
    tab_profile: 'Profile',
    tab_services: 'My Services',
    tab_my_requests: 'My Requests',
    tab_delegation: 'Delegation',
    summary_title: 'Summary',
    summary_desc: 'Overview of your account',
    summary_welcome: 'Welcome to your client dashboard. Here you can manage your services and requests.',
    profile_title: 'Profile',
    profile_desc: 'Your account information',
    delegation_title: 'Delegation',
    // Service Request
    service_request_form_title: 'Submit Task Request',
    service_request_form_desc: 'Tell us what you need help with',
    service_request_title_label: 'Request Title',
    service_request_title_placeholder: 'e.g., Create monthly report',
    service_request_description_label: 'Description',
    service_request_description_placeholder: 'Describe your request in detail...',
    service_request_type_label: 'Request Type',
    service_request_deadline_label: 'Deadline (Optional)',
    service_request_info_note: 'Your Asistenmu will contact you via WhatsApp to discuss the details.',
    service_request_submit: 'Submit Request',
    service_request_submitting: 'Submitting...',
    service_request_list_title: 'My Requests',
    service_request_list_desc: 'Track your submitted requests',
    service_request_list_empty: 'No requests yet. Submit your first request above.',
    request_type_normal: 'Normal',
    request_type_normal_label: 'Normal',
    request_type_normal_helper: 'Standard processing time (3-5 business days)',
    request_type_priority: 'Priority',
    request_type_priority_label: 'Priority',
    request_type_priority_helper: 'Faster processing (1-2 business days)',
    request_type_urgent: 'Urgent',
    request_type_urgent_label: 'Urgent',
    request_type_urgent_helper: 'Immediate attention (within 24 hours)',
    status_requested: 'Requested',
    deadline_label: 'Deadline',
    // Partner dashboard
    partner_greeting: 'Hello, {name}!',
    partner_greeting_desc: 'Welcome to your partner workspace',
    partner_summary_title: 'Summary',
    partner_summary_desc: 'Overview of your tasks and earnings',
    partner_summary_welcome: 'Welcome to your partner dashboard.',
    partner_profile_title: 'Profile',
    partner_profile_desc: 'Your partner information',
    menu_summary: 'Summary',
    menu_profile: 'Profile',
    menu_work: 'Work',
    menu_income: 'Income',
    partner_pending_alert: 'Your application is pending review.',
    partner_work_title: 'Work',
    partner_work_desc: 'Your tasks and assignments',
    partner_financial_title: 'Financial',
    partner_financial_desc: 'Your earnings and balance',
    partner_balance_title: 'Balance',
    partner_balance_desc: 'Current balance',
    partner_cert_title: 'Certifications',
    partner_cert_desc: 'Your certifications',
    // Admin dashboard
    admin_summary_title: 'Admin Dashboard',
    admin_summary_desc: 'System overview and management',
    admin_summary_welcome: 'Welcome to the admin dashboard.',
    // Asistenmu dashboard
    asistenmu_workspace_title: 'Asistenmu Workspace',
    asistenmu_dashboard_title: 'Asistenmu Dashboard',
    asistenmu_dashboard_desc: 'Manage your tasks and clients',
    asistenmu_dashboard_title_card: 'Dashboard',
    asistenmu_dashboard_desc_card: 'Your workspace overview',
    asistenmu_dashboard_placeholder: 'Dashboard features coming soon.',
    // Finance dashboard
    finance_workspace_title: 'Finance Workspace',
    finance_dashboard_title: 'Finance Dashboard',
    finance_dashboard_desc: 'Financial management and reporting',
    finance_dashboard_title_card: 'Dashboard',
    finance_dashboard_desc_card: 'Financial overview',
    finance_dashboard_placeholder: 'Dashboard features coming soon.',
    // Management dashboard
    management_workspace_title: 'Management Workspace',
    management_dashboard_title: 'Management Dashboard',
    management_dashboard_desc: 'Strategic oversight and reporting',
    management_dashboard_title_card: 'Dashboard',
    management_dashboard_desc_card: 'Management overview',
    management_dashboard_placeholder: 'Dashboard features coming soon.',
    // Supervisor dashboard
    supervisor_workspace_title: 'Supervisor Workspace',
    supervisor_dashboard_title: 'Supervisor Dashboard',
    supervisor_dashboard_desc: 'Team oversight and task management',
    supervisor_dashboard_title_card: 'Dashboard',
    supervisor_dashboard_desc_card: 'Supervisor overview',
    supervisor_dashboard_placeholder: 'Dashboard features coming soon.',
    // Superadmin dashboard
    superadmin_summary_title: 'Superadmin Dashboard',
    superadmin_summary_desc: 'System overview and management',
    superadmin_summary_welcome: 'Welcome to the superadmin dashboard.',
    superadmin_audit_title: 'Audit Log',
    superadmin_audit_desc: 'System activity and changes',
    task_management_title: 'Task Management',
    task_management_desc: 'Manage and track all tasks',
    client_work_requests_title: 'Client Work Requests',
    client_work_requests_desc: 'View and manage client task requests',
    no_requests_yet: 'No client requests yet.',
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  id: {
    // Navigation
    nav_home: 'Beranda',
    nav_services: 'Layanan',
    nav_join: 'Gabung sebagai Partner',
    nav_register: 'Daftar',
    nav_have_account: 'Sudah punya akun?',
    nav_login: 'Masuk',
    // Landing page
    hero_title: 'Asisten Pribadi untuk Pertumbuhan Bisnis Anda',
    hero_subtitle: 'Fokus pada yang penting. Biarkan Asistenku mengurus sisanya.',
    hero_cta_start: 'Mulai Sekarang',
    hero_cta_login: 'Masuk',
    unique_needs_title: 'Setiap bisnis punya kebutuhan unik',
    unique_needs_desc: 'Pilih paket layanan yang sesuai dengan tahap dan tujuan bisnis Anda.',
    services_title: 'Layanan Kami',
    services_subtitle: 'Paket fleksibel yang dirancang untuk kebutuhan bisnis Anda',
    service_tenang_title: 'TENANG',
    service_tenang_desc: 'Sempurna untuk startup dan bisnis kecil. Dapatkan dukungan administratif penting untuk menjaga bisnis Anda berjalan lancar.',
    service_tenang_price: 'Mulai dari Rp 2,5 juta/bulan',
    service_rapi_title: 'RAPI',
    service_rapi_desc: 'Ideal untuk bisnis yang berkembang. Dukungan komprehensif untuk operasi, dokumentasi, dan layanan pelanggan.',
    service_rapi_price: 'Mulai dari Rp 5 juta/bulan',
    service_fokus_title: 'FOKUS',
    service_fokus_desc: 'Untuk bisnis yang sudah mapan. Tim khusus untuk manajemen proyek, riset, dan inisiatif strategis.',
    service_fokus_price: 'Mulai dari Rp 10 juta/bulan',
    service_jaga_title: 'JAGA',
    service_jaga_desc: 'Layanan premium untuk perusahaan. Asisten khusus penuh waktu untuk dukungan eksekutif dan pengembangan bisnis.',
    service_jaga_price: 'Mulai dari Rp 20 juta/bulan',
    service_cta: 'Hubungi Kami',
    compare_title: 'Mengapa Memilih Asistenku?',
    compare_alone_title: 'Bekerja Sendiri',
    compare_alone_1: 'Kewalahan dengan tugas admin',
    compare_alone_2: 'Kehilangan peluang pertumbuhan',
    compare_alone_3: 'Dokumentasi tidak konsisten',
    compare_alone_4: 'Kapasitas terbatas',
    compare_together_title: 'Dengan Asistenku',
    compare_together_1: 'Fokus pada bisnis inti',
    compare_together_2: 'Tangkap setiap peluang',
    compare_together_3: 'Dokumentasi profesional',
    compare_together_4: 'Dukungan yang dapat diskalakan',
    compare_cta: 'Mulai Perjalanan Anda',
    faq_title: 'Pertanyaan yang Sering Diajukan',
    faq_q1: 'Bagaimana cara kerja Asistenku?',
    faq_a1: 'Cukup pilih paket layanan Anda, dan kami akan mencocokkan Anda dengan asisten khusus yang memahami kebutuhan bisnis Anda.',
    faq_q2: 'Bisakah saya mengubah paket saya nanti?',
    faq_a2: 'Ya! Anda dapat meningkatkan atau menyesuaikan paket Anda seiring pertumbuhan bisnis Anda.',
    faq_q3: 'Bagaimana jika saya membutuhkan keterampilan khusus?',
    faq_a3: 'Tim kami mencakup spesialis di berbagai bidang. Kami akan mencocokkan Anda dengan keahlian yang tepat.',
    join_title: 'Bergabung dengan Jaringan Partner Kami',
    join_benefit_1: 'Jam kerja fleksibel',
    join_benefit_2: 'Kompensasi kompetitif',
    join_benefit_3: 'Peluang pengembangan keterampilan',
    join_benefit_4: 'Komunitas yang mendukung',
    join_cta: 'Daftar Sekarang',
    // Internal access
    internal_access_title: 'Akses Internal',
    internal_access_hint: 'Masukkan kode akses Anda untuk melanjutkan',
    access_code_label: 'Kode Akses',
    continue: 'Lanjutkan',
    back: 'Kembali',
    invalid_code_ui: 'Kode akses tidak valid. Silakan coba lagi.',
    // Login
    login_title: 'Selamat Datang Kembali',
    login_subtitle: 'Pilih ruang kerja Anda untuk melanjutkan',
    login_as_client: 'Masuk sebagai Klien',
    login_as_partner: 'Masuk sebagai Partner',
    workspace_btn: 'Ruang Kerja Saya',
    public_mismatch_ui: 'Peran akun Anda tidak cocok. Silakan gunakan opsi login yang benar.',
    // Registration
    register_title: 'Buat Akun Anda',
    register_subtitle: 'Bergabung dengan Asistenku hari ini',
    tab_client: 'Klien',
    tab_partner: 'Partner',
    register_button: 'Daftar',
    registering: 'Mendaftar...',
    logging_in: 'Masuk...',
    login_required_hint: 'Silakan masuk dengan Internet Identity terlebih dahulu',
    already_have_account: 'Sudah punya akun?',
    registration_success_title: 'Pendaftaran Berhasil!',
    registration_success_client: 'Akun klien Anda telah berhasil dibuat.',
    registration_success_partner: 'Aplikasi partner Anda telah dikirim. Kami akan meninjau dan menghubungi Anda segera.',
    your_id: 'ID Anda',
    go_to_dashboard: 'Ke Dashboard',
    error_already_registered: 'Anda sudah memiliki akun. Silakan masuk.',
    error_registration_failed: 'Pendaftaran gagal. Silakan coba lagi.',
    // Internal gate guard
    internal_locked_title: 'Akses Diperlukan',
    internal_locked_hint: 'Anda perlu memasukkan kode akses internal terlebih dahulu',
    go_to_internal: 'Ke Akses Internal',
    // Access gate
    verify_access_title: 'Verifikasi Akses',
    verify_access_hint: 'Klik tombol di bawah untuk memverifikasi akses Anda',
    verify_and_open: 'Verifikasi dan Buka',
    // Client dashboard
    workspace_title: 'Ruang Kerja',
    client_greeting: 'Halo, {name}!',
    client_greeting_desc: 'Selamat datang di ruang kerja Anda',
    tab_summary: 'Ringkasan',
    tab_profile: 'Profil',
    tab_services: 'Layanan Saya',
    tab_my_requests: 'Permintaan Saya',
    tab_delegation: 'Delegasi',
    summary_title: 'Ringkasan',
    summary_desc: 'Ikhtisar akun Anda',
    summary_welcome: 'Selamat datang di dashboard klien Anda. Di sini Anda dapat mengelola layanan dan permintaan Anda.',
    profile_title: 'Profil',
    profile_desc: 'Informasi akun Anda',
    delegation_title: 'Delegasi',
    // Service Request
    service_request_form_title: 'Kirim permintaan tugas',
    service_request_form_desc: 'Beritahu kami apa yang Anda butuhkan',
    service_request_title_label: 'Judul Permintaan',
    service_request_title_placeholder: 'contoh: Buat laporan bulanan',
    service_request_description_label: 'Deskripsi',
    service_request_description_placeholder: 'Jelaskan permintaan Anda secara detail...',
    service_request_type_label: 'Jenis Permintaan',
    service_request_deadline_label: 'Tenggat Waktu (Opsional)',
    service_request_info_note: 'Asistenmu Anda akan menghubungi Anda melalui WhatsApp untuk membahas detailnya.',
    service_request_submit: 'Kirim Permintaan',
    service_request_submitting: 'Mengirim...',
    service_request_list_title: 'Permintaan Saya',
    service_request_list_desc: 'Lacak permintaan yang telah Anda kirim',
    service_request_list_empty: 'Belum ada permintaan. Kirim permintaan pertama Anda di atas.',
    request_type_normal: 'Normal',
    request_type_normal_label: 'Normal',
    request_type_normal_helper: 'Waktu pemrosesan standar (3-5 hari kerja)',
    request_type_priority: 'Prioritas',
    request_type_priority_label: 'Prioritas',
    request_type_priority_helper: 'Pemrosesan lebih cepat (1-2 hari kerja)',
    request_type_urgent: 'Mendesak',
    request_type_urgent_label: 'Mendesak',
    request_type_urgent_helper: 'Perhatian segera (dalam 24 jam)',
    status_requested: 'Diminta',
    deadline_label: 'Tenggat',
    // Partner dashboard
    partner_greeting: 'Halo, {name}!',
    partner_greeting_desc: 'Selamat datang di ruang kerja partner Anda',
    partner_summary_title: 'Ringkasan',
    partner_summary_desc: 'Ikhtisar tugas dan penghasilan Anda',
    partner_summary_welcome: 'Selamat datang di dashboard partner Anda.',
    partner_profile_title: 'Profil',
    partner_profile_desc: 'Informasi partner Anda',
    menu_summary: 'Ringkasan',
    menu_profile: 'Profil',
    menu_work: 'Pekerjaan',
    menu_income: 'Pendapatan',
    partner_pending_alert: 'Aplikasi Anda sedang ditinjau.',
    partner_work_title: 'Pekerjaan',
    partner_work_desc: 'Tugas dan penugasan Anda',
    partner_financial_title: 'Keuangan',
    partner_financial_desc: 'Penghasilan dan saldo Anda',
    partner_balance_title: 'Saldo',
    partner_balance_desc: 'Saldo saat ini',
    partner_cert_title: 'Sertifikasi',
    partner_cert_desc: 'Sertifikasi Anda',
    // Admin dashboard
    admin_summary_title: 'Dashboard Admin',
    admin_summary_desc: 'Ikhtisar dan manajemen sistem',
    admin_summary_welcome: 'Selamat datang di dashboard admin.',
    // Asistenmu dashboard
    asistenmu_workspace_title: 'Ruang Kerja Asistenmu',
    asistenmu_dashboard_title: 'Dashboard Asistenmu',
    asistenmu_dashboard_desc: 'Kelola tugas dan klien Anda',
    asistenmu_dashboard_title_card: 'Dashboard',
    asistenmu_dashboard_desc_card: 'Ikhtisar ruang kerja Anda',
    asistenmu_dashboard_placeholder: 'Fitur dashboard segera hadir.',
    // Finance dashboard
    finance_workspace_title: 'Ruang Kerja Finance',
    finance_dashboard_title: 'Dashboard Finance',
    finance_dashboard_desc: 'Manajemen keuangan dan pelaporan',
    finance_dashboard_title_card: 'Dashboard',
    finance_dashboard_desc_card: 'Ikhtisar keuangan',
    finance_dashboard_placeholder: 'Fitur dashboard segera hadir.',
    // Management dashboard
    management_workspace_title: 'Ruang Kerja Management',
    management_dashboard_title: 'Dashboard Management',
    management_dashboard_desc: 'Pengawasan strategis dan pelaporan',
    management_dashboard_title_card: 'Dashboard',
    management_dashboard_desc_card: 'Ikhtisar management',
    management_dashboard_placeholder: 'Fitur dashboard segera hadir.',
    // Supervisor dashboard
    supervisor_workspace_title: 'Ruang Kerja Supervisor',
    supervisor_dashboard_title: 'Dashboard Supervisor',
    supervisor_dashboard_desc: 'Pengawasan tim dan manajemen tugas',
    supervisor_dashboard_title_card: 'Dashboard',
    supervisor_dashboard_desc_card: 'Ikhtisar supervisor',
    supervisor_dashboard_placeholder: 'Fitur dashboard segera hadir.',
    // Superadmin dashboard
    superadmin_summary_title: 'Dashboard Superadmin',
    superadmin_summary_desc: 'Ikhtisar dan manajemen sistem',
    superadmin_summary_welcome: 'Selamat datang di dashboard superadmin.',
    superadmin_audit_title: 'Log Audit',
    superadmin_audit_desc: 'Aktivitas dan perubahan sistem',
    task_management_title: 'Manajemen Task',
    task_management_desc: 'Kelola dan lacak semua task',
    client_work_requests_title: 'Permintaan Pekerjaan Client',
    client_work_requests_desc: 'Lihat dan kelola permintaan task dari client',
    no_requests_yet: 'Belum ada permintaan dari client.',
    // Common
    loading: 'Memuat...',
    error: 'Kesalahan',
    success: 'Berhasil',
  },
};

export function t(key: TranslationKey, locale: Locale = 'en'): string {
  return translations[locale][key] || translations.en[key] || key;
}

export function getLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('asistenku_locale');
  return (stored === 'id' ? 'id' : 'en') as Locale;
}

export function setLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('asistenku_locale', locale);
}
