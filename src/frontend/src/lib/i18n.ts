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
  | 'tab_service_request'
  | 'tab_delegation'
  | 'summary_title'
  | 'summary_desc'
  | 'summary_welcome'
  | 'profile_title'
  | 'profile_desc'
  | 'services_my_title'
  | 'services_my_desc'
  | 'services_none'
  | 'delegation_title'
  | 'delegation_locked_desc'
  | 'contact_admin'
  // Service Request
  | 'service_request_form_title'
  | 'service_request_form_desc'
  | 'service_request_title_label'
  | 'service_request_title_placeholder'
  | 'service_request_description_label'
  | 'service_request_description_placeholder'
  | 'service_request_type_label'
  | 'request_type_normal'
  | 'request_type_normal_helper'
  | 'request_type_normal_label'
  | 'request_type_priority'
  | 'request_type_priority_helper'
  | 'request_type_priority_label'
  | 'request_type_urgent'
  | 'request_type_urgent_helper'
  | 'request_type_urgent_label'
  | 'service_request_deadline_label'
  | 'service_request_info_note'
  | 'service_request_submit'
  | 'service_request_submitting'
  | 'service_request_list_title'
  | 'service_request_list_desc'
  | 'service_request_list_empty'
  | 'status_requested'
  | 'deadline_label'
  | 'loading'
  // Partner dashboard
  | 'partner_pending_alert'
  | 'partner_summary_title'
  | 'partner_summary_desc'
  | 'partner_summary_welcome'
  | 'partner_profile_title'
  | 'partner_profile_desc'
  | 'partner_work_title'
  | 'partner_work_desc'
  | 'partner_income_title'
  | 'partner_financial_title'
  | 'partner_financial_desc'
  | 'partner_balance_title'
  | 'partner_balance_desc'
  | 'partner_cert_title'
  | 'partner_cert_desc'
  | 'partner_academy_title'
  | 'partner_academy_desc'
  | 'partner_academy_content'
  // Admin dashboard
  | 'admin_dashboard_title'
  | 'admin_dashboard_desc'
  | 'admin_summary_title'
  | 'admin_summary_desc'
  | 'admin_summary_welcome'
  | 'admin_users_title'
  | 'admin_users_desc'
  | 'admin_internal_access_title'
  | 'admin_internal_access_desc'
  | 'admin_client_title'
  | 'admin_client_desc'
  | 'admin_client_placeholder'
  | 'admin_partner_title'
  | 'admin_partner_desc'
  | 'admin_partner_placeholder'
  | 'admin_services_title'
  | 'admin_services_desc'
  | 'admin_services_placeholder'
  | 'admin_task_title'
  | 'admin_task_desc'
  | 'admin_task_placeholder'
  | 'admin_access_title'
  // Superadmin dashboard
  | 'superadmin_dashboard_title'
  | 'superadmin_dashboard_desc'
  | 'superadmin_summary_title'
  | 'superadmin_summary_desc'
  | 'superadmin_summary_welcome'
  | 'superadmin_users_title'
  | 'superadmin_users_desc'
  | 'superadmin_users_placeholder'
  | 'superadmin_internal_access_title'
  | 'superadmin_internal_access_desc'
  | 'superadmin_financial_title'
  | 'superadmin_financial_desc'
  | 'superadmin_financial_placeholder'
  | 'superadmin_internal_title'
  | 'superadmin_internal_desc'
  | 'superadmin_internal_placeholder'
  | 'superadmin_roles_title'
  | 'superadmin_roles_desc'
  | 'superadmin_roles_placeholder'
  | 'superadmin_access_title'
  | 'superadmin_audit_title'
  | 'superadmin_audit_desc'
  // Internal dashboards
  | 'asistenmu_workspace_title'
  | 'asistenmu_dashboard_title'
  | 'asistenmu_dashboard_desc'
  | 'asistenmu_dashboard_title_card'
  | 'asistenmu_dashboard_desc_card'
  | 'asistenmu_dashboard_placeholder'
  | 'supervisor_workspace_title'
  | 'supervisor_dashboard_title'
  | 'supervisor_dashboard_desc'
  | 'supervisor_dashboard_title_card'
  | 'supervisor_dashboard_desc_card'
  | 'supervisor_dashboard_placeholder'
  | 'management_workspace_title'
  | 'management_dashboard_title'
  | 'management_dashboard_desc'
  | 'management_dashboard_title_card'
  | 'management_dashboard_desc_card'
  | 'management_dashboard_placeholder'
  | 'finance_workspace_title'
  | 'finance_dashboard_title'
  | 'finance_dashboard_desc'
  | 'finance_dashboard_title_card'
  | 'finance_dashboard_desc_card'
  | 'finance_dashboard_placeholder'
  // Menu labels
  | 'menu_summary'
  | 'menu_profile'
  | 'menu_work'
  | 'menu_income'
  | 'menu_client'
  | 'menu_partner'
  | 'menu_services'
  | 'menu_task'
  | 'menu_access'
  | 'menu_users'
  | 'menu_financial'
  | 'menu_internal'
  | 'menu_roles'
  | 'menu_audit'
  | 'menu_internal_access'
  | 'menu_audit_log'
  // Common labels
  | 'coming_soon';

const dictionary: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_services: 'Services for Me',
    nav_join: 'Join Asistenku',
    nav_register: 'Register',
    nav_have_account: 'Already have an account?',
    nav_login: 'Login',
    // Landing page
    hero_title: 'Live your day calmly,\nsupported by your Assistant neatly.',
    hero_subtitle: 'Asistenku is here to accompany your daily life — so your energy can be used for more important things.',
    hero_cta_start: 'Start from here',
    hero_cta_login: 'Go to Workspace',
    unique_needs_title: 'Unique Needs',
    unique_needs_desc: 'Everyone has different life and business phases. We understand that there is no one-size-fits-all solution. Asistenku is here to accompany you in a way that suits your current needs.',
    services_title: 'Services for Me',
    services_subtitle: 'Choose a service that suits your current life and business phase',
    service_tenang_title: 'Calm 🧘',
    service_tenang_desc: 'When you are busy in a positive sense, you want to be calmer in your daily life. Your assistant accompanies routine matters, so your energy can return to other things—that are important to you.',
    service_tenang_price: 'Starting from Rp 3,500,000 / month',
    service_rapi_title: 'Neat 🗂️',
    service_rapi_desc: 'When your life is calmer, you start to organize and balance your personal and business life. So that they do not collide with each other, and you can still take time for what is important to you—whether it is family, partner, yourself, or just stop for a moment.',
    service_rapi_price: 'Starting from Rp 5,000,000 / month',
    service_fokus_title: 'Focus 🎯',
    service_fokus_desc: 'When everything starts to be neat, you want to keep your attention on the most important things. Not because of lack of hard work, but because you need space to think, decide, and move without being distracted by small things that drain focus.',
    service_fokus_price: 'Starting from Rp 8,500,000 / month',
    service_jaga_title: 'Guard 🛡️',
    service_jaga_desc: 'When the business is running, you want to keep it stable and improving—without having to monitor constantly. There is someone who ensures the details are handled neatly, so you do not have to deal with people who come and go.',
    service_jaga_price: 'Starting from Rp 12,000,000 / month',
    service_cta: 'Let\'s talk first',
    compare_title: 'Bear Alone or Accompanied?',
    compare_alone_title: 'Bear Alone',
    compare_alone_1: '• You handle all the details yourself—from small to big.',
    compare_alone_2: '• Energy is drained for routines that can be delegated.',
    compare_alone_3: '• Time to think and rest is reduced.',
    compare_alone_4: '• Risk of burnout increases.',
    compare_together_title: 'Accompanied',
    compare_together_1: '• Someone helps with routines and operational details.',
    compare_together_2: '• You can focus on what is important.',
    compare_together_3: '• More time to think, decide, and rest.',
    compare_together_4: '• Burnout risk is reduced.',
    compare_cta: 'Let\'s talk first',
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'What is Asistenku?',
    faq_a1: 'Asistenku is a service that provides personal and business assistants to help you with daily routines and operational details.',
    faq_q2: 'How does it work?',
    faq_a2: 'You choose a service package that suits your needs, and we will assign an assistant to help you with your daily tasks.',
    faq_q3: 'How much does it cost?',
    faq_a3: 'Prices vary depending on the service package you choose. Please contact us for more information.',
    join_title: 'Join as Partner',
    join_benefit_1: '• Flexible working hours',
    join_benefit_2: '• Competitive compensation',
    join_benefit_3: '• Professional development',
    join_benefit_4: '• Supportive community',
    join_cta: 'Join now',
    // Internal access
    internal_access_title: 'Internal Access',
    internal_access_hint: 'Enter your access code to continue',
    access_code_label: 'Access Code',
    continue: 'Continue',
    back: 'Back',
    invalid_code_ui: 'Invalid access code',
    // Login
    login_title: 'Login',
    login_subtitle: 'Choose your role to continue',
    login_as_client: 'Login as Client',
    login_as_partner: 'Login as Partner',
    workspace_btn: 'My Workspace',
    public_mismatch_ui: 'Role mismatch. Please login with the correct role.',
    // Registration
    register_title: 'Register',
    register_subtitle: 'Create your account',
    tab_client: 'Client',
    tab_partner: 'Partner',
    register_button: 'Register',
    registering: 'Registering...',
    logging_in: 'Logging in...',
    login_required_hint: 'Please login with Internet Identity first',
    already_have_account: 'Already have an account?',
    registration_success_title: 'Registration Successful',
    registration_success_client: 'Your client account has been created successfully.',
    registration_success_partner: 'Your partner account has been created successfully.',
    your_id: 'Your ID',
    go_to_dashboard: 'Go to Dashboard',
    error_already_registered: 'You are already registered',
    error_registration_failed: 'Registration failed',
    // Internal gate guard
    internal_locked_title: 'Access Restricted',
    internal_locked_hint: 'You need to pass the internal gate first',
    go_to_internal: 'Go to Internal Gate',
    // Access gate
    verify_access_title: 'Verify Access',
    verify_access_hint: 'Click the button below to verify your access',
    verify_and_open: 'Verify and Open',
    // Client dashboard
    workspace_title: 'Workspace',
    client_greeting: 'Hello, {name}',
    client_greeting_desc: 'Welcome to your workspace',
    tab_summary: 'Summary',
    tab_profile: 'Profile',
    tab_services: 'My Services',
    tab_service_request: 'Service Request',
    tab_delegation: 'Delegation',
    summary_title: 'Summary',
    summary_desc: 'Overview of your account',
    summary_welcome: 'Welcome to your workspace',
    profile_title: 'Profile',
    profile_desc: 'Your account information',
    services_my_title: 'My Services',
    services_my_desc: 'List of your active services',
    services_none: 'No active services',
    delegation_title: 'Delegation',
    delegation_locked_desc: 'You do not have an active service. Please contact admin.',
    contact_admin: 'Contact Admin',
    // Service Request
    service_request_form_title: 'Submit Service Request',
    service_request_form_desc: 'Fill in the form below to submit a new service request',
    service_request_title_label: 'Request Title',
    service_request_title_placeholder: 'Enter a brief title for your request',
    service_request_description_label: 'Request Description',
    service_request_description_placeholder: 'Describe your request in detail',
    service_request_type_label: 'Request Type',
    request_type_normal: 'Normal',
    request_type_normal_helper: 'Suitable for work with completion time more than 2 days.',
    request_type_normal_label: 'Normal',
    request_type_priority: 'Priority',
    request_type_priority_helper: 'Suitable if work needs to be completed in about 1 day.',
    request_type_priority_label: 'Priority',
    request_type_urgent: 'Urgent',
    request_type_urgent_helper: 'For urgent needs, target under 12 hours. Availability will be confirmed by Asistenmu.',
    request_type_urgent_label: 'Urgent',
    service_request_deadline_label: 'Deadline (Optional)',
    service_request_info_note: 'The time estimates above are initial guidance. The final number of services and schedule will be determined by Asistenmu after review and confirmation.',
    service_request_submit: 'Submit Request',
    service_request_submitting: 'Submitting...',
    service_request_list_title: 'My Requests',
    service_request_list_desc: 'List of your submitted service requests',
    service_request_list_empty: 'No requests yet',
    status_requested: 'REQUESTED',
    deadline_label: 'Deadline',
    loading: 'Loading...',
    // Partner dashboard
    partner_pending_alert: 'Your account is pending approval',
    partner_summary_title: 'Summary',
    partner_summary_desc: 'Overview of your account',
    partner_summary_welcome: 'Welcome to your workspace',
    partner_profile_title: 'Profile',
    partner_profile_desc: 'Your account information',
    partner_work_title: 'My Work',
    partner_work_desc: 'List of your assigned tasks',
    partner_income_title: 'Income',
    partner_financial_title: 'Financial',
    partner_financial_desc: 'Your financial information',
    partner_balance_title: 'Balance',
    partner_balance_desc: 'Your current balance',
    partner_cert_title: 'Certification',
    partner_cert_desc: 'Your certifications',
    partner_academy_title: 'Academy',
    partner_academy_desc: 'Training and development',
    partner_academy_content: 'Coming soon',
    // Admin dashboard
    admin_dashboard_title: 'Admin Dashboard',
    admin_dashboard_desc: 'Manage your organization',
    admin_summary_title: 'Summary',
    admin_summary_desc: 'Overview of your organization',
    admin_summary_welcome: 'Welcome to admin dashboard',
    admin_users_title: 'User Management',
    admin_users_desc: 'Manage users',
    admin_internal_access_title: 'Internal Access',
    admin_internal_access_desc: 'Manage internal access codes',
    admin_client_title: 'Clients',
    admin_client_desc: 'Manage clients',
    admin_client_placeholder: 'Client management coming soon',
    admin_partner_title: 'Partners',
    admin_partner_desc: 'Manage partners',
    admin_partner_placeholder: 'Partner management coming soon',
    admin_services_title: 'Service Management',
    admin_services_desc: 'Manage services',
    admin_services_placeholder: 'Service management coming soon',
    admin_task_title: 'Task Management',
    admin_task_desc: 'Manage tasks',
    admin_task_placeholder: 'Task management coming soon',
    admin_access_title: 'Access',
    // Superadmin dashboard
    superadmin_dashboard_title: 'Superadmin Dashboard',
    superadmin_dashboard_desc: 'Full system control',
    superadmin_summary_title: 'Summary',
    superadmin_summary_desc: 'System overview',
    superadmin_summary_welcome: 'Welcome to superadmin dashboard',
    superadmin_users_title: 'User Management',
    superadmin_users_desc: 'Manage all users',
    superadmin_users_placeholder: 'User management coming soon',
    superadmin_internal_access_title: 'Internal Access',
    superadmin_internal_access_desc: 'Manage internal access codes',
    superadmin_financial_title: 'Financial',
    superadmin_financial_desc: 'Financial overview',
    superadmin_financial_placeholder: 'Financial management coming soon',
    superadmin_internal_title: 'Internal',
    superadmin_internal_desc: 'Internal management',
    superadmin_internal_placeholder: 'Internal management coming soon',
    superadmin_roles_title: 'Roles',
    superadmin_roles_desc: 'Role management',
    superadmin_roles_placeholder: 'Role management coming soon',
    superadmin_access_title: 'Access',
    superadmin_audit_title: 'Audit Log',
    superadmin_audit_desc: 'System audit log',
    // Internal dashboards
    asistenmu_workspace_title: 'Asistenmu Workspace',
    asistenmu_dashboard_title: 'Asistenmu Dashboard',
    asistenmu_dashboard_desc: 'Manage your tasks',
    asistenmu_dashboard_title_card: 'Dashboard',
    asistenmu_dashboard_desc_card: 'Your workspace',
    asistenmu_dashboard_placeholder: 'Dashboard coming soon',
    supervisor_workspace_title: 'Supervisor Workspace',
    supervisor_dashboard_title: 'Supervisor Dashboard',
    supervisor_dashboard_desc: 'Monitor team performance',
    supervisor_dashboard_title_card: 'Dashboard',
    supervisor_dashboard_desc_card: 'Your workspace',
    supervisor_dashboard_placeholder: 'Dashboard coming soon',
    management_workspace_title: 'Management Workspace',
    management_dashboard_title: 'Management Dashboard',
    management_dashboard_desc: 'Strategic overview',
    management_dashboard_title_card: 'Dashboard',
    management_dashboard_desc_card: 'Your workspace',
    management_dashboard_placeholder: 'Dashboard coming soon',
    finance_workspace_title: 'Finance Workspace',
    finance_dashboard_title: 'Finance Dashboard',
    finance_dashboard_desc: 'Financial management',
    finance_dashboard_title_card: 'Dashboard',
    finance_dashboard_desc_card: 'Your workspace',
    finance_dashboard_placeholder: 'Dashboard coming soon',
    // Menu labels
    menu_summary: 'Summary',
    menu_profile: 'Profile',
    menu_work: 'Work',
    menu_income: 'Income',
    menu_client: 'Clients',
    menu_partner: 'Partners',
    menu_services: 'Services',
    menu_task: 'Tasks',
    menu_access: 'Access',
    menu_users: 'Users',
    menu_financial: 'Financial',
    menu_internal: 'Internal',
    menu_roles: 'Roles',
    menu_audit: 'Audit',
    menu_internal_access: 'Internal Access',
    menu_audit_log: 'Audit Log',
    // Common labels
    coming_soon: 'Coming soon',
  },
  id: {
    // Navigation
    nav_home: 'Beranda',
    nav_services: 'Layanan untuk Saya',
    nav_join: 'Gabung Asistenku',
    nav_register: 'Daftar',
    nav_have_account: 'Sudah punya akun?',
    nav_login: 'Masuk',
    // Landing page
    hero_title: 'Jalani hari dengan tenang,\ndidampingi Asistenmu dengan rapi.',
    hero_subtitle: 'Asistenku hadir menemani keseharian Anda — agar energi bisa dipakai untuk hal yang lebih penting.',
    hero_cta_start: 'Mulai dari sini',
    hero_cta_login: 'Ke Ruang Kerja',
    unique_needs_title: 'Kebutuhan yang Unik',
    unique_needs_desc: 'Setiap orang punya fase hidup dan bisnis yang berbeda. Kami paham tidak ada solusi yang cocok untuk semua. Asistenku hadir menemani Anda dengan cara yang sesuai kebutuhan Anda saat ini.',
    services_title: 'Layanan untuk Saya',
    services_subtitle: 'Pilih layanan yang sesuai dengan fase hidup dan bisnis Anda saat ini',
    service_tenang_title: 'Tenang 🧘',
    service_tenang_desc: 'Saat Anda sibuk dalam arti positif, Anda ingin lebih tenang dalam keseharian. Asisten Anda menemani urusan rutin, agar energi bisa kembali ke hal lain—yang penting buat Anda.',
    service_tenang_price: 'Mulai dari Rp 3.500.000 / bulan',
    service_rapi_title: 'Rapi 🗂️',
    service_rapi_desc: 'Saat hidup sudah lebih tenang, Anda mulai menata dan menyeimbangkan hidup personal dan bisnis. Agar tidak saling bertabrakan, dan Anda masih bisa ambil waktu untuk yang penting buat Anda—entah itu keluarga, pasangan, diri sendiri, atau sekadar berhenti sejenak.',
    service_rapi_price: 'Mulai dari Rp 5.000.000 / bulan',
    service_fokus_title: 'Fokus 🎯',
    service_fokus_desc: 'Saat semua mulai rapi, Anda ingin tetap fokus pada hal yang paling penting. Bukan karena kurang kerja keras, tapi karena Anda butuh ruang untuk berpikir, memutuskan, dan bergerak tanpa terganggu hal-hal kecil yang menguras fokus.',
    service_fokus_price: 'Mulai dari Rp 8.500.000 / bulan',
    service_jaga_title: 'Jaga 🛡️',
    service_jaga_desc: 'Saat bisnis sudah jalan, Anda ingin tetap stabil dan terus membaik—tanpa harus memantau terus-menerus. Ada yang memastikan detail ditangani dengan rapi, jadi Anda tidak perlu berurusan dengan orang yang datang dan pergi.',
    service_jaga_price: 'Mulai dari Rp 12.000.000 / bulan',
    service_cta: 'Yuk ngobrol dulu',
    compare_title: 'Tanggung Sendiri atau Didampingi?',
    compare_alone_title: 'Tanggung Sendiri',
    compare_alone_1: '• Anda tangani semua detail sendiri—dari kecil sampai besar.',
    compare_alone_2: '• Energi terkuras untuk rutinitas yang bisa didelegasikan.',
    compare_alone_3: '• Waktu untuk berpikir dan istirahat berkurang.',
    compare_alone_4: '• Risiko burnout meningkat.',
    compare_together_title: 'Didampingi',
    compare_together_1: '• Ada yang bantu rutinitas dan detail operasional.',
    compare_together_2: '• Anda bisa fokus pada yang penting.',
    compare_together_3: '• Lebih banyak waktu untuk berpikir, memutuskan, dan istirahat.',
    compare_together_4: '• Risiko burnout berkurang.',
    compare_cta: 'Yuk ngobrol dulu',
    faq_title: 'Pertanyaan yang Sering Diajukan',
    faq_q1: 'Apa itu Asistenku?',
    faq_a1: 'Asistenku adalah layanan yang menyediakan asisten personal dan bisnis untuk membantu Anda dengan rutinitas harian dan detail operasional.',
    faq_q2: 'Bagaimana cara kerjanya?',
    faq_a2: 'Anda memilih paket layanan yang sesuai dengan kebutuhan Anda, dan kami akan menugaskan asisten untuk membantu Anda dengan tugas harian Anda.',
    faq_q3: 'Berapa biayanya?',
    faq_a3: 'Harga bervariasi tergantung pada paket layanan yang Anda pilih. Silakan hubungi kami untuk informasi lebih lanjut.',
    join_title: 'Gabung sebagai Partner',
    join_benefit_1: '• Jam kerja fleksibel',
    join_benefit_2: '• Kompensasi kompetitif',
    join_benefit_3: '• Pengembangan profesional',
    join_benefit_4: '• Komunitas yang mendukung',
    join_cta: 'Gabung sekarang',
    // Internal access
    internal_access_title: 'Akses Internal',
    internal_access_hint: 'Masukkan kode akses Anda untuk melanjutkan',
    access_code_label: 'Kode Akses',
    continue: 'Lanjutkan',
    back: 'Kembali',
    invalid_code_ui: 'Kode akses tidak valid',
    // Login
    login_title: 'Masuk',
    login_subtitle: 'Pilih peran Anda untuk melanjutkan',
    login_as_client: 'Masuk sebagai Klien',
    login_as_partner: 'Masuk sebagai Partner',
    workspace_btn: 'Ruang Kerja Saya',
    public_mismatch_ui: 'Peran tidak cocok. Silakan masuk dengan peran yang benar.',
    // Registration
    register_title: 'Daftar',
    register_subtitle: 'Buat akun Anda',
    tab_client: 'Klien',
    tab_partner: 'Partner',
    register_button: 'Daftar',
    registering: 'Mendaftar...',
    logging_in: 'Masuk...',
    login_required_hint: 'Silakan masuk dengan Internet Identity terlebih dahulu',
    already_have_account: 'Sudah punya akun?',
    registration_success_title: 'Pendaftaran Berhasil',
    registration_success_client: 'Akun klien Anda telah berhasil dibuat.',
    registration_success_partner: 'Akun partner Anda telah berhasil dibuat.',
    your_id: 'ID Anda',
    go_to_dashboard: 'Ke Dashboard',
    error_already_registered: 'Anda sudah terdaftar',
    error_registration_failed: 'Pendaftaran gagal',
    // Internal gate guard
    internal_locked_title: 'Akses Terbatas',
    internal_locked_hint: 'Anda perlu melewati gerbang internal terlebih dahulu',
    go_to_internal: 'Ke Gerbang Internal',
    // Access gate
    verify_access_title: 'Verifikasi Akses',
    verify_access_hint: 'Klik tombol di bawah untuk memverifikasi akses Anda',
    verify_and_open: 'Verifikasi dan Buka',
    // Client dashboard
    workspace_title: 'Ruang Kerja',
    client_greeting: 'Halo, {name}',
    client_greeting_desc: 'Selamat datang di ruang kerja Anda',
    tab_summary: 'Ringkasan',
    tab_profile: 'Profil',
    tab_services: 'Layanan Saya',
    tab_service_request: 'Permintaan Layanan',
    tab_delegation: 'Delegasi',
    summary_title: 'Ringkasan',
    summary_desc: 'Ikhtisar akun Anda',
    summary_welcome: 'Selamat datang di ruang kerja Anda',
    profile_title: 'Profil',
    profile_desc: 'Informasi akun Anda',
    services_my_title: 'Layanan Saya',
    services_my_desc: 'Daftar layanan aktif Anda',
    services_none: 'Tidak ada layanan aktif',
    delegation_title: 'Delegasi',
    delegation_locked_desc: 'Anda belum mempunyai layanan aktif. Silahkan hubungi admin.',
    contact_admin: 'Hubungi Admin',
    // Service Request
    service_request_form_title: 'Kirim Permintaan Layanan',
    service_request_form_desc: 'Isi formulir di bawah untuk mengajukan permintaan layanan baru',
    service_request_title_label: 'Judul Permintaan',
    service_request_title_placeholder: 'Masukkan judul singkat untuk permintaan Anda',
    service_request_description_label: 'Deskripsi Permintaan',
    service_request_description_placeholder: 'Jelaskan permintaan Anda secara detail',
    service_request_type_label: 'Tipe Permintaan',
    request_type_normal: 'Normal',
    request_type_normal_helper: 'Cocok untuk pekerjaan dengan waktu pengerjaan lebih dari 2 hari.',
    request_type_normal_label: 'Normal',
    request_type_priority: 'Prioritas',
    request_type_priority_helper: 'Cocok jika pekerjaan perlu diselesaikan dalam ±1 hari.',
    request_type_priority_label: 'Prioritas',
    request_type_urgent: 'Urgent',
    request_type_urgent_helper: 'Untuk kebutuhan mendesak, target < 12 jam. Ketersediaan akan dikonfirmasi oleh Asistenmu.',
    request_type_urgent_label: 'Urgent',
    service_request_deadline_label: 'Deadline (Opsional)',
    service_request_info_note: 'Estimasi waktu di atas adalah panduan awal. Jumlah layanan dan jadwal final akan ditentukan oleh Asistenmu setelah review dan konfirmasi.',
    service_request_submit: 'Kirim Permintaan',
    service_request_submitting: 'Mengirim...',
    service_request_list_title: 'Permintaan Saya',
    service_request_list_desc: 'Daftar permintaan layanan yang telah Anda kirim',
    service_request_list_empty: 'Belum ada permintaan',
    status_requested: 'REQUESTED',
    deadline_label: 'Deadline',
    loading: 'Memuat...',
    // Partner dashboard
    partner_pending_alert: 'Akun Anda menunggu persetujuan',
    partner_summary_title: 'Ringkasan',
    partner_summary_desc: 'Ikhtisar akun Anda',
    partner_summary_welcome: 'Selamat datang di ruang kerja Anda',
    partner_profile_title: 'Profil',
    partner_profile_desc: 'Informasi akun Anda',
    partner_work_title: 'Pekerjaan Saya',
    partner_work_desc: 'Daftar tugas yang ditugaskan kepada Anda',
    partner_income_title: 'Pendapatan',
    partner_financial_title: 'Keuangan',
    partner_financial_desc: 'Informasi keuangan Anda',
    partner_balance_title: 'Saldo',
    partner_balance_desc: 'Saldo Anda saat ini',
    partner_cert_title: 'Sertifikasi',
    partner_cert_desc: 'Sertifikasi Anda',
    partner_academy_title: 'Akademi',
    partner_academy_desc: 'Pelatihan dan pengembangan',
    partner_academy_content: 'Segera hadir',
    // Admin dashboard
    admin_dashboard_title: 'Dashboard Admin',
    admin_dashboard_desc: 'Kelola organisasi Anda',
    admin_summary_title: 'Ringkasan',
    admin_summary_desc: 'Ikhtisar organisasi Anda',
    admin_summary_welcome: 'Selamat datang di dashboard admin',
    admin_users_title: 'Manajemen Pengguna',
    admin_users_desc: 'Kelola pengguna',
    admin_internal_access_title: 'Akses Internal',
    admin_internal_access_desc: 'Kelola kode akses internal',
    admin_client_title: 'Klien',
    admin_client_desc: 'Kelola klien',
    admin_client_placeholder: 'Manajemen klien segera hadir',
    admin_partner_title: 'Partner',
    admin_partner_desc: 'Kelola partner',
    admin_partner_placeholder: 'Manajemen partner segera hadir',
    admin_services_title: 'Manajemen Layanan',
    admin_services_desc: 'Kelola layanan',
    admin_services_placeholder: 'Manajemen layanan segera hadir',
    admin_task_title: 'Manajemen Tugas',
    admin_task_desc: 'Kelola tugas',
    admin_task_placeholder: 'Manajemen tugas segera hadir',
    admin_access_title: 'Akses',
    // Superadmin dashboard
    superadmin_dashboard_title: 'Dashboard Superadmin',
    superadmin_dashboard_desc: 'Kontrol sistem penuh',
    superadmin_summary_title: 'Ringkasan',
    superadmin_summary_desc: 'Ikhtisar sistem',
    superadmin_summary_welcome: 'Selamat datang di dashboard superadmin',
    superadmin_users_title: 'Manajemen Pengguna',
    superadmin_users_desc: 'Kelola semua pengguna',
    superadmin_users_placeholder: 'Manajemen pengguna segera hadir',
    superadmin_internal_access_title: 'Akses Internal',
    superadmin_internal_access_desc: 'Kelola kode akses internal',
    superadmin_financial_title: 'Keuangan',
    superadmin_financial_desc: 'Ikhtisar keuangan',
    superadmin_financial_placeholder: 'Manajemen keuangan segera hadir',
    superadmin_internal_title: 'Internal',
    superadmin_internal_desc: 'Manajemen internal',
    superadmin_internal_placeholder: 'Manajemen internal segera hadir',
    superadmin_roles_title: 'Peran',
    superadmin_roles_desc: 'Manajemen peran',
    superadmin_roles_placeholder: 'Manajemen peran segera hadir',
    superadmin_access_title: 'Akses',
    superadmin_audit_title: 'Log Audit',
    superadmin_audit_desc: 'Log audit sistem',
    // Internal dashboards
    asistenmu_workspace_title: 'Ruang Kerja Asistenmu',
    asistenmu_dashboard_title: 'Dashboard Asistenmu',
    asistenmu_dashboard_desc: 'Kelola tugas Anda',
    asistenmu_dashboard_title_card: 'Dashboard',
    asistenmu_dashboard_desc_card: 'Ruang kerja Anda',
    asistenmu_dashboard_placeholder: 'Dashboard segera hadir',
    supervisor_workspace_title: 'Ruang Kerja Supervisor',
    supervisor_dashboard_title: 'Dashboard Supervisor',
    supervisor_dashboard_desc: 'Pantau kinerja tim',
    supervisor_dashboard_title_card: 'Dashboard',
    supervisor_dashboard_desc_card: 'Ruang kerja Anda',
    supervisor_dashboard_placeholder: 'Dashboard segera hadir',
    management_workspace_title: 'Ruang Kerja Manajemen',
    management_dashboard_title: 'Dashboard Manajemen',
    management_dashboard_desc: 'Ikhtisar strategis',
    management_dashboard_title_card: 'Dashboard',
    management_dashboard_desc_card: 'Ruang kerja Anda',
    management_dashboard_placeholder: 'Dashboard segera hadir',
    finance_workspace_title: 'Ruang Kerja Keuangan',
    finance_dashboard_title: 'Dashboard Keuangan',
    finance_dashboard_desc: 'Manajemen keuangan',
    finance_dashboard_title_card: 'Dashboard',
    finance_dashboard_desc_card: 'Ruang kerja Anda',
    finance_dashboard_placeholder: 'Dashboard segera hadir',
    // Menu labels
    menu_summary: 'Ringkasan',
    menu_profile: 'Profil',
    menu_work: 'Pekerjaan',
    menu_income: 'Pendapatan',
    menu_client: 'Klien',
    menu_partner: 'Partner',
    menu_services: 'Layanan',
    menu_task: 'Tugas',
    menu_access: 'Akses',
    menu_users: 'Pengguna',
    menu_financial: 'Keuangan',
    menu_internal: 'Internal',
    menu_roles: 'Peran',
    menu_audit: 'Audit',
    menu_internal_access: 'Akses Internal',
    menu_audit_log: 'Log Audit',
    // Common labels
    coming_soon: 'Segera hadir',
  },
};

export function t(key: TranslationKey, locale: Locale = 'en'): string {
  return dictionary[locale][key] || dictionary.en[key] || key;
}

export const LOCALE_STORAGE_KEY = 'asistenku_locale';

// Helper functions for locale persistence
export function getLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return (stored === 'id' ? 'id' : 'en') as Locale;
}

export function setLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
