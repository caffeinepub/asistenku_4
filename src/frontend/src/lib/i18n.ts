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
    compare_together_2: '• Energy for important and strategic things.',
    compare_together_3: '• Space to think and rest.',
    compare_together_4: '• Neat system maintains stability.',
    compare_cta: 'Let\'s talk first',
    faq_title: 'FAQ',
    faq_q1: 'Is this suitable if I am not sure yet?',
    faq_a1: 'That\'s exactly it. Let\'s talk first.',
    faq_q2: 'Do I have to choose one service?',
    faq_a2: 'No. You can choose more than one according to your life phase.',
    faq_q3: 'Is this a replacement for employees?',
    faq_a3: 'No. This is accompaniment with your Assistant and the Asistenku Team.',
    join_title: 'Join Asistenku',
    join_benefit_1: '✓ Apply to be part of the Asistenku Team',
    join_benefit_2: '✓ Selection and curation',
    join_benefit_3: '✓ No need to find work yourself',
    join_benefit_4: '✓ Fair work system and wages',
    join_cta: 'I want to join',
    // Internal access
    internal_access_title: 'Internal Access',
    internal_access_hint: 'Enter your access code to continue',
    access_code_label: 'Access Code',
    continue: 'Continue',
    back: 'Back',
    invalid_code_ui: 'Invalid code. Please check and try again.',
    // Login
    login_title: 'Login',
    login_subtitle: 'Please choose according to your account',
    login_as_client: 'Login as Client',
    login_as_partner: 'Login as Partner',
    workspace_btn: 'My Workspace',
    public_mismatch_ui: 'Please click according to your account.',
    // Registration
    register_title: 'Register',
    register_subtitle: 'Create your account',
    tab_client: 'Client',
    tab_partner: 'Partner',
    register_button: 'Register',
    registering: 'Registering...',
    logging_in: 'Logging in...',
    login_required_hint: 'You need to login with Internet Identity first. Click Register to start.',
    already_have_account: 'Already have an account? Login',
    registration_success_title: 'Registration Successful!',
    registration_success_client: 'Your client account has been created',
    registration_success_partner: 'Your partner account has been created',
    your_id: 'Your ID',
    go_to_dashboard: 'Go to Dashboard',
    error_already_registered: 'You already have an account. Please login instead.',
    error_registration_failed: 'Registration failed. Please try again.',
    // Internal gate guard
    internal_locked_title: 'Internal Access Locked',
    internal_locked_hint: 'Please enter via /internal and input the access code first.',
    go_to_internal: 'Go to Internal Page',
    // Access gate
    verify_access_title: 'Verify Access',
    verify_access_hint: 'To open this workspace, click verify.',
    verify_and_open: 'Verify & Open',
    // Client dashboard
    workspace_title: 'WORKSPACE',
    client_greeting: 'Hi, {name} 👋',
    client_greeting_desc: 'This is your workspace summary today.',
    tab_summary: 'Summary',
    tab_profile: 'Profile',
    tab_services: 'My Services',
    tab_delegation: 'Delegation',
    summary_title: 'Summary',
    summary_desc: 'Overview of your workspace',
    summary_welcome: 'Welcome to your workspace dashboard.',
    profile_title: 'Profile',
    profile_desc: 'Your account information',
    services_my_title: 'My Services',
    services_my_desc: 'Your active services',
    services_none: 'No active services yet.',
    delegation_title: 'Delegation',
    delegation_locked_desc: 'This feature is locked until you have active services',
    contact_admin: 'Contact admin',
    // Partner dashboard
    partner_pending_alert: 'Your account is pending approval. Some features may be limited.',
    partner_summary_title: 'Summary',
    partner_summary_desc: 'Overview of your partner workspace',
    partner_summary_welcome: 'Welcome to your partner dashboard.',
    partner_profile_title: 'Profile',
    partner_profile_desc: 'Your partner account information',
    partner_work_title: 'Work',
    partner_work_desc: 'Your work assignments',
    partner_income_title: 'Income',
    partner_financial_title: 'Financial Profile',
    partner_financial_desc: 'Your financial information and payment details',
    partner_balance_title: 'Balance',
    partner_balance_desc: 'Your current balance and transaction history',
    partner_cert_title: 'Certificate',
    partner_cert_desc: 'Your certificates and credentials',
    partner_academy_title: 'Asistenku Academy',
    partner_academy_desc: 'Coming Soon',
    partner_academy_content: 'Training and development resources',
    // Admin dashboard
    admin_dashboard_title: 'Admin Dashboard',
    admin_dashboard_desc: 'System administration',
    admin_summary_title: 'Summary',
    admin_summary_desc: 'Overview of admin workspace',
    admin_summary_welcome: 'Welcome to admin dashboard.',
    admin_users_title: 'User Management',
    admin_users_desc: 'Manage all users',
    admin_internal_access_title: 'Internal Access Management',
    admin_internal_access_desc: 'Manage internal access codes',
    admin_client_title: 'Client Management',
    admin_client_desc: 'Manage client accounts and services',
    admin_client_placeholder: 'Client management placeholder',
    admin_partner_title: 'Partner Management',
    admin_partner_desc: 'Manage partner accounts and assignments',
    admin_partner_placeholder: 'Partner management placeholder',
    admin_services_title: 'Services',
    admin_services_desc: 'Service management and configuration',
    admin_services_placeholder: 'Service management placeholder',
    admin_task_title: 'Task Management',
    admin_task_desc: 'Task assignment and tracking',
    admin_task_placeholder: 'Task management placeholder',
    admin_access_title: 'Internal Access Management',
    // Superadmin dashboard
    superadmin_dashboard_title: 'Superadmin Dashboard',
    superadmin_dashboard_desc: 'System-wide administration and monitoring',
    superadmin_summary_title: 'Summary',
    superadmin_summary_desc: 'Overview of superadmin workspace',
    superadmin_summary_welcome: 'Welcome to superadmin dashboard.',
    superadmin_users_title: 'User Summary',
    superadmin_users_desc: 'Overview of all users in the system',
    superadmin_users_placeholder: 'User summary placeholder',
    superadmin_internal_access_title: 'Internal Access Management',
    superadmin_internal_access_desc: 'Manage internal access codes and permissions',
    superadmin_financial_title: 'Financial Overview',
    superadmin_financial_desc: 'System-wide financial metrics',
    superadmin_financial_placeholder: 'Financial overview placeholder',
    superadmin_internal_title: 'Internal Users',
    superadmin_internal_desc: 'Manage internal team members',
    superadmin_internal_placeholder: 'Internal users placeholder',
    superadmin_roles_title: 'Role Assignment',
    superadmin_roles_desc: 'Manage user roles and permissions',
    superadmin_roles_placeholder: 'Role assignment placeholder',
    superadmin_access_title: 'Internal Access Management',
    superadmin_audit_title: 'Audit Log',
    superadmin_audit_desc: 'System activity and security audit trail',
    // Internal dashboards
    asistenmu_workspace_title: 'ASISTENMU WORKSPACE',
    asistenmu_dashboard_title: 'Asistenmu Dashboard',
    asistenmu_dashboard_desc: 'Your workspace for client support',
    asistenmu_dashboard_title_card: 'Dashboard',
    asistenmu_dashboard_desc_card: 'Overview of your tasks and assignments',
    asistenmu_dashboard_placeholder: 'Dashboard content placeholder',
    supervisor_workspace_title: 'SUPERVISOR WORKSPACE',
    supervisor_dashboard_title: 'Supervisor Dashboard',
    supervisor_dashboard_desc: 'Team oversight and management',
    supervisor_dashboard_title_card: 'Dashboard',
    supervisor_dashboard_desc_card: 'Overview of team performance and tasks',
    supervisor_dashboard_placeholder: 'Dashboard content placeholder',
    management_workspace_title: 'MANAGEMENT WORKSPACE',
    management_dashboard_title: 'Management Dashboard',
    management_dashboard_desc: 'Strategic oversight and planning',
    management_dashboard_title_card: 'Dashboard',
    management_dashboard_desc_card: 'Overview of business operations',
    management_dashboard_placeholder: 'Dashboard content placeholder',
    finance_workspace_title: 'FINANCE WORKSPACE',
    finance_dashboard_title: 'Finance Dashboard',
    finance_dashboard_desc: 'Financial management and reporting',
    finance_dashboard_title_card: 'Dashboard',
    finance_dashboard_desc_card: 'Overview of financial operations',
    finance_dashboard_placeholder: 'Dashboard content placeholder',
    // Menu labels
    menu_summary: 'Summary',
    menu_profile: 'Profile',
    menu_work: 'Work',
    menu_income: 'Income',
    menu_client: 'Client',
    menu_partner: 'Partner',
    menu_services: 'Services',
    menu_task: 'Task',
    menu_access: 'Internal Access',
    menu_users: 'User Summary',
    menu_financial: 'Financial Overview',
    menu_internal: 'Internal Users',
    menu_roles: 'Role Assignment',
    menu_audit: 'Audit Log',
    menu_internal_access: 'Internal Access',
    menu_audit_log: 'Audit Log',
    // Common
    coming_soon: 'Coming Soon'
  },
  id: {
    // Navigation
    nav_home: 'Beranda',
    nav_services: 'Layanan untuk Saya',
    nav_join: 'Bergabung dengan Asistenku',
    nav_register: 'Daftar',
    nav_have_account: 'Sudah punya akun?',
    nav_login: 'Masuk',
    // Landing page
    hero_title: 'Tenang menjalani hari,\ndidampingi oleh Asistenmu dengan rapi.',
    hero_subtitle: 'Asistenku hadir untuk menemani keseharian Anda — supaya energi kamu bisa digunakan untuk hal yang lebih penting.',
    hero_cta_start: 'Mulai dari sini',
    hero_cta_login: 'Masuk ke Ruang Kerja',
    unique_needs_title: 'Kebutuhan yang Unik',
    unique_needs_desc: 'Setiap orang memiliki fase hidup dan bisnis yang berbeda. Kami memahami bahwa tidak ada solusi yang cocok untuk semua. Asistenku hadir untuk mendampingi Anda dengan cara yang sesuai dengan kebutuhan Anda saat ini.',
    services_title: 'Layanan untuk Saya',
    services_subtitle: 'Pilih layanan yang sesuai dengan fase hidup dan bisnis Anda saat ini',
    service_tenang_title: 'Tenang 🧘',
    service_tenang_desc: 'Saat kamu sibuk dalam artian positif, kamu ingin lebih tenang menjalankan keseharian. Asistenmu mendampingi hal-hal rutinitas, supaya energimu bisa kembali untuk hal lainnya—yang penting buatmu.',
    service_tenang_price: 'Mulai dari Rp 3.500.000 / bulan',
    service_rapi_title: 'Rapi 🗂️',
    service_rapi_desc: 'Saat hidupmu sudah lebih tenang, kamu mulai merapikan dan menyeimbangkan kehidupan pribadi dan bisnis. Supaya keduanya tidak saling bertabrakan, dan kamu tetap bisa mengambil waktu untuk hal yang penting buatmu—entah itu keluarga, pasangan, diri sendiri, atau sekadar berhenti sebentar.',
    service_rapi_price: 'Mulai dari Rp 5.000.000 / bulan',
    service_fokus_title: 'Fokus 🎯',
    service_fokus_desc: 'Saat semuanya mulai rapi, kamu ingin menjaga perhatian tetap di hal yang paling penting. Bukan karena kurang kerja keras, tapi karena kamu butuh ruang untuk berpikir, memutuskan, dan bergerak tanpa terganggu hal kecil yang menguras fokus.',
    service_fokus_price: 'Mulai dari Rp 8.500.000 / bulan',
    service_jaga_title: 'Jaga 🛡️',
    service_jaga_desc: 'Saat bisnis sudah berjalan, kamu ingin menjaganya tetap stabil dan membaik—tanpa harus memantau terus-menerus. Ada yang memastikan detailnya tertangani dengan rapi, jadi kamu tidak pusing berhadapan dengan orang yang datang dan pergi.',
    service_jaga_price: 'Mulai dari Rp 12.000.000 / bulan',
    service_cta: 'Ngobrol dulu',
    compare_title: 'Menanggung Sendiri atau Didampingi?',
    compare_alone_title: 'Menanggung Sendiri',
    compare_alone_1: '• Kamu mengurus semua detail sendiri—dari hal kecil sampai yang besar.',
    compare_alone_2: '• Energi terkuras untuk rutinitas yang bisa didelegasikan.',
    compare_alone_3: '• Waktu berpikir dan istirahat berkurang.',
    compare_alone_4: '• Risiko burnout meningkat.',
    compare_together_title: 'Didampingi',
    compare_together_1: '• Ada yang membantu rutinitas dan detail operasional.',
    compare_together_2: '• Energi untuk hal penting dan strategis.',
    compare_together_3: '• Ruang untuk berpikir dan istirahat.',
    compare_together_4: '• Sistem rapi menjaga stabilitas.',
    compare_cta: 'Ngobrol dulu',
    faq_title: 'FAQ',
    faq_q1: 'Apakah ini cocok kalau saya belum yakin?',
    faq_a1: 'Justru itu. Ngobrol dulu.',
    faq_q2: 'Apakah harus pilih satu layanan?',
    faq_a2: 'Tidak. Kamu bisa pilih lebih dari satu sesuai fase hidupmu.',
    faq_q3: 'Apakah ini pengganti karyawan?',
    faq_a3: 'Bukan. Ini pendampingan bersama Asistenmu dan Tim Asistenku.',
    join_title: 'Bergabung dengan Asistenku',
    join_benefit_1: '✓ Daftar untuk menjadi bagian dari Tim Asistenku',
    join_benefit_2: '✓ Seleksi dan kurasi',
    join_benefit_3: '✓ Tidak perlu cari kerja sendiri',
    join_benefit_4: '✓ Sistem kerja dan upah yang adil',
    join_cta: 'Saya mau bergabung',
    // Internal access
    internal_access_title: 'Akses Internal',
    internal_access_hint: 'Masukkan kode akses Anda untuk melanjutkan',
    access_code_label: 'Kode Akses',
    continue: 'Lanjutkan',
    back: 'Kembali',
    invalid_code_ui: 'Kode tidak valid. Silakan periksa dan coba lagi.',
    // Login
    login_title: 'Masuk',
    login_subtitle: 'Silakan pilih sesuai akun Anda',
    login_as_client: 'Masuk sebagai Klien',
    login_as_partner: 'Masuk sebagai Partner',
    workspace_btn: 'Ruang Kerja Saya',
    public_mismatch_ui: 'Silakan klik sesuai akun Anda.',
    // Registration
    register_title: 'Daftar',
    register_subtitle: 'Buat akun Anda',
    tab_client: 'Klien',
    tab_partner: 'Partner',
    register_button: 'Daftar',
    registering: 'Mendaftar...',
    logging_in: 'Masuk...',
    login_required_hint: 'Anda perlu masuk dengan Internet Identity terlebih dahulu. Klik Daftar untuk memulai.',
    already_have_account: 'Sudah punya akun? Masuk',
    registration_success_title: 'Pendaftaran Berhasil!',
    registration_success_client: 'Akun klien Anda telah dibuat',
    registration_success_partner: 'Akun partner Anda telah dibuat',
    your_id: 'ID Anda',
    go_to_dashboard: 'Ke Dashboard',
    error_already_registered: 'Anda sudah memiliki akun. Silakan masuk.',
    error_registration_failed: 'Pendaftaran gagal. Silakan coba lagi.',
    // Internal gate guard
    internal_locked_title: 'Akses Internal Terkunci',
    internal_locked_hint: 'Silakan masuk melalui /internal dan masukkan kode akses terlebih dahulu.',
    go_to_internal: 'Ke Halaman Internal',
    // Access gate
    verify_access_title: 'Verifikasi Akses',
    verify_access_hint: 'Untuk membuka ruang kerja ini, klik verifikasi.',
    verify_and_open: 'Verifikasi & Buka',
    // Client dashboard
    workspace_title: 'RUANG KERJA',
    client_greeting: 'Hai, {name} 👋',
    client_greeting_desc: 'Ini ringkasan ruang kerja Anda hari ini.',
    tab_summary: 'Ringkasan',
    tab_profile: 'Profil',
    tab_services: 'Layanan Saya',
    tab_delegation: 'Delegasi',
    summary_title: 'Ringkasan',
    summary_desc: 'Gambaran umum ruang kerja Anda',
    summary_welcome: 'Selamat datang di dashboard ruang kerja Anda.',
    profile_title: 'Profil',
    profile_desc: 'Informasi akun Anda',
    services_my_title: 'Layanan Saya',
    services_my_desc: 'Layanan aktif Anda',
    services_none: 'Belum ada layanan aktif.',
    delegation_title: 'Delegasi',
    delegation_locked_desc: 'Fitur ini terkunci sampai Anda memiliki layanan aktif',
    contact_admin: 'Hubungi admin',
    // Partner dashboard
    partner_pending_alert: 'Akun Anda menunggu persetujuan. Beberapa fitur mungkin terbatas.',
    partner_summary_title: 'Ringkasan',
    partner_summary_desc: 'Gambaran umum ruang kerja partner Anda',
    partner_summary_welcome: 'Selamat datang di dashboard partner Anda.',
    partner_profile_title: 'Profil',
    partner_profile_desc: 'Informasi akun partner Anda',
    partner_work_title: 'Pekerjaan',
    partner_work_desc: 'Tugas pekerjaan Anda',
    partner_income_title: 'Pendapatan',
    partner_financial_title: 'Profil Keuangan',
    partner_financial_desc: 'Informasi keuangan dan detail pembayaran Anda',
    partner_balance_title: 'Saldo',
    partner_balance_desc: 'Saldo saat ini dan riwayat transaksi Anda',
    partner_cert_title: 'Sertifikat',
    partner_cert_desc: 'Sertifikat dan kredensial Anda',
    partner_academy_title: 'Akademi Asistenku',
    partner_academy_desc: 'Segera Hadir',
    partner_academy_content: 'Sumber daya pelatihan dan pengembangan',
    // Admin dashboard
    admin_dashboard_title: 'Dashboard Admin',
    admin_dashboard_desc: 'Administrasi sistem',
    admin_summary_title: 'Ringkasan',
    admin_summary_desc: 'Gambaran umum ruang kerja admin',
    admin_summary_welcome: 'Selamat datang di dashboard admin.',
    admin_users_title: 'Manajemen Pengguna',
    admin_users_desc: 'Kelola semua pengguna',
    admin_internal_access_title: 'Manajemen Akses Internal',
    admin_internal_access_desc: 'Kelola kode akses internal',
    admin_client_title: 'Manajemen Klien',
    admin_client_desc: 'Kelola akun klien dan layanan',
    admin_client_placeholder: 'Placeholder manajemen klien',
    admin_partner_title: 'Manajemen Partner',
    admin_partner_desc: 'Kelola akun partner dan tugas',
    admin_partner_placeholder: 'Placeholder manajemen partner',
    admin_services_title: 'Layanan',
    admin_services_desc: 'Manajemen dan konfigurasi layanan',
    admin_services_placeholder: 'Placeholder manajemen layanan',
    admin_task_title: 'Manajemen Tugas',
    admin_task_desc: 'Penugasan dan pelacakan tugas',
    admin_task_placeholder: 'Placeholder manajemen tugas',
    admin_access_title: 'Manajemen Akses Internal',
    // Superadmin dashboard
    superadmin_dashboard_title: 'Dashboard Superadmin',
    superadmin_dashboard_desc: 'Administrasi dan pemantauan seluruh sistem',
    superadmin_summary_title: 'Ringkasan',
    superadmin_summary_desc: 'Gambaran umum ruang kerja superadmin',
    superadmin_summary_welcome: 'Selamat datang di dashboard superadmin.',
    superadmin_users_title: 'Ringkasan Pengguna',
    superadmin_users_desc: 'Gambaran umum semua pengguna dalam sistem',
    superadmin_users_placeholder: 'Placeholder ringkasan pengguna',
    superadmin_internal_access_title: 'Manajemen Akses Internal',
    superadmin_internal_access_desc: 'Kelola kode akses internal dan izin',
    superadmin_financial_title: 'Gambaran Keuangan',
    superadmin_financial_desc: 'Metrik keuangan seluruh sistem',
    superadmin_financial_placeholder: 'Placeholder gambaran keuangan',
    superadmin_internal_title: 'Pengguna Internal',
    superadmin_internal_desc: 'Kelola anggota tim internal',
    superadmin_internal_placeholder: 'Placeholder pengguna internal',
    superadmin_roles_title: 'Penugasan Peran',
    superadmin_roles_desc: 'Kelola peran dan izin pengguna',
    superadmin_roles_placeholder: 'Placeholder penugasan peran',
    superadmin_access_title: 'Manajemen Akses Internal',
    superadmin_audit_title: 'Log Audit',
    superadmin_audit_desc: 'Jejak audit aktivitas dan keamanan sistem',
    // Internal dashboards
    asistenmu_workspace_title: 'RUANG KERJA ASISTENMU',
    asistenmu_dashboard_title: 'Dashboard Asistenmu',
    asistenmu_dashboard_desc: 'Ruang kerja Anda untuk dukungan klien',
    asistenmu_dashboard_title_card: 'Dashboard',
    asistenmu_dashboard_desc_card: 'Gambaran umum tugas dan penugasan Anda',
    asistenmu_dashboard_placeholder: 'Placeholder konten dashboard',
    supervisor_workspace_title: 'RUANG KERJA SUPERVISOR',
    supervisor_dashboard_title: 'Dashboard Supervisor',
    supervisor_dashboard_desc: 'Pengawasan dan manajemen tim',
    supervisor_dashboard_title_card: 'Dashboard',
    supervisor_dashboard_desc_card: 'Gambaran umum kinerja tim dan tugas',
    supervisor_dashboard_placeholder: 'Placeholder konten dashboard',
    management_workspace_title: 'RUANG KERJA MANAJEMEN',
    management_dashboard_title: 'Dashboard Manajemen',
    management_dashboard_desc: 'Pengawasan strategis dan perencanaan',
    management_dashboard_title_card: 'Dashboard',
    management_dashboard_desc_card: 'Gambaran umum operasi bisnis',
    management_dashboard_placeholder: 'Placeholder konten dashboard',
    finance_workspace_title: 'RUANG KERJA KEUANGAN',
    finance_dashboard_title: 'Dashboard Keuangan',
    finance_dashboard_desc: 'Manajemen dan pelaporan keuangan',
    finance_dashboard_title_card: 'Dashboard',
    finance_dashboard_desc_card: 'Gambaran umum operasi keuangan',
    finance_dashboard_placeholder: 'Placeholder konten dashboard',
    // Menu labels
    menu_summary: 'Ringkasan',
    menu_profile: 'Profil',
    menu_work: 'Pekerjaan',
    menu_income: 'Pendapatan',
    menu_client: 'Klien',
    menu_partner: 'Partner',
    menu_services: 'Layanan',
    menu_task: 'Tugas',
    menu_access: 'Akses Internal',
    menu_users: 'Ringkasan Pengguna',
    menu_financial: 'Gambaran Keuangan',
    menu_internal: 'Pengguna Internal',
    menu_roles: 'Penugasan Peran',
    menu_audit: 'Log Audit',
    menu_internal_access: 'Akses Internal',
    menu_audit_log: 'Log Audit',
    // Common
    coming_soon: 'Segera Hadir'
  }
};

export function t(key: TranslationKey, locale: Locale = 'en'): string {
  return dictionary[locale][key] || dictionary.en[key] || key;
}

export function getLocale(): Locale {
  const stored = localStorage.getItem('asistenku_locale');
  return (stored === 'id' ? 'id' : 'en') as Locale;
}

export function setLocale(locale: Locale): void {
  localStorage.setItem('asistenku_locale', locale);
}
