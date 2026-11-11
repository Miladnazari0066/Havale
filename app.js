// =========================================
// 1. تنظیمات اولیه و متغیرها
// =========================================
const SUPABASE_URL = "https://sizebshjcwiumclcbsrg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dUexAxlEw_-mZuMbVc3Wmg_aWrJDQmj";
let supabaseClient = null;

try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        keepSupabaseAlive(); // Heartbeat
    }
} catch (e) { console.error("خطا در راه‌اندازی دیتابیس:", e); }

const kafpooshProducts = [
    { code: "10", name: "ام دی اف ملامینه سفید - white" }, { code: "10", name: "ام دی اف ملامینه سفید تکرو - white one side" },
    { code: "12", name: "ام دی اف ملامینه کد 12 - KSP12" }, { code: "14", name: "ام دی اف ملامینه کد 14 - KSP14" },
    { code: "40", name: "ام دی اف ملامینه کد 40 - KSP40" }, { code: "43", name: "ام دی اف ملامینه کد 43 - KSP 43" },
    { code: "46", name: "ام دی اف ملامینه کد 46 - KSP46" }, { code: "71", name: "ام دی اف ملامینه کد 71 - KSP71" },
    { code: "75", name: "ام دی اف ملامینه کد 75 - KSP 75" }, { code: "76", name: "ام دی اف ملامینه کد 76 - KSP 76" },
    { code: "77", name: "ام دی اف ملامینه کد 77 - KSP77" }, { code: "79", name: "ام دی اف ملامینه کد 79 - KSP 79" },
    { code: "80", name: "ام دی اف ملامینه کد 80 - KSP 80" }, { code: "82", name: "ام دی اف ملامینه کد 82 - KSP82" },
    { code: "83", name: "ام دی اف ملامینه کد 83 - KSP83" }, { code: "85", name: "ام دی اف ملامینه کد 85 - KSP 85" },
    { code: "86", name: "ام دی اف ملامینه کد 86 - KSP86" }, { code: "16", name: "ام دی اف ملامینه کرم - CREAM" },
    { code: "87", name: "ام دی اف ملامینه خاکستری 1 - GRAY-1" }, { code: "89", name: "ام دی اف ملامینه خاکستری 3 - GRAY -3" },
    { code: "99", name: "ام دی اف ملامینه مشکی - BLACK" }, { code: "200", name: "ام دی اف ملامینه بلوط روشن - LIGHT OAK" },
    { code: "201", name: "ام دی اف ملامینه انتیک کاج - ANTIQUE Kag" }, { code: "203", name: "ام دی اف ملامینه بالتیمور کرم - CREAM BAL TIMOUR" },
    { code: "205", name: "ام دی اف ملامینه کرمازوهیرکانی - HLRKANI KARMAZOO" }, { code: "206", name: "ام دی اف ملامینه کاتانیا - CATANIA" },
    { code: "207", name: "ام دی اف ملامینه انتیک لایت - ANTIQUE LIGHT" }, { code: "208", name: "ام دی اف ملامینه انجالک - SORBUS" },
    { code: "209", name: "ام دی اف ملامینه شاه بلوط هیرکانی - HIRKANI KING OAK" }, { code: "210", name: "ام دی اف ملامینه لیون روشن - LYON WALNUT LIGHT" },
    { code: "211", name: "ام دی اف ملامینه لیون مدیوم - LYON MEDIUM" }, { code: "213", name: "ام دی اف ملامینه کانادا اوک - CANADA OAK" },
    { code: "214", name: "ام دی اف ملامینه سوناما - SONAMA" }, { code: "215", name: "ام دی اف ملامینه فلگ استاف اوک 2 - FLAGSTAFF OAK 2" },
    { code: "216", name: "ام دی اف ملامینه فلگ استاف اوک 3 - FLAGSTAFF OAK 3" }, { code: "217", name: "ام دی اف ملامینه سون اوک - SEVEN OAK" },
    { code: "218", name: "ام دی اف ملامینه بیگ اوک روشن - BIG OAK LIGH T" }, { code: "219", name: "ام دی اف ملامینه بیگ اوک مدیوم - BIG OAK MIDDLE" },
    { code: "220", name: "ام دی اف ملامینه تک سوز تیره - DARK TAK SUZ" }, { code: "221", name: "ام دی اف ملامینه افرا هیرکانی - ACER" },
    { code: "223", name: "ام دی اف ملامینه اقاقیا - ROBINIA" }, { code: "224", name: "ام دی اف ملامینه تیللا - TILALA" },
    { code: "225", name: "ام دی اف ملامینه ملچ روشن - LIGHT MALACH" }, { code: "226", name: "ام دی اف ملامینه تلکا - PYRUS" },
    { code: "228", name: "ام دی اف ملامینه ممرز هیکانی 1 - HIRKANI MAMREZ 1" }, { code: "229", name: "ام دی اف ملامینه ممرز هیکانی 2 - HIRKANI MAMREZ 2" },
    { code: "232", name: "ام دی اف ملامینه ممرز هیکانی 3 - HIRKANI MAMREZ 3" }, { code: "230", name: "ام دی اف ملامینه کلیاف روشن - LIGHT CLEAF" },
    { code: "231", name: "ام دی اف ملامینه کلیاف مدیوم - MEDIUM CLEAF" }, { code: "235", name: "ام دی اف ملامینه انتیک طلایی - GOLDEN ANTIQUE" },
    { code: "236", name: "ام دی اف ملامینه اباکای 1 - ABACA 1" }, { code: "237", name: "ام دی اف ملامینه اباکای 2 - ABACA 2" },
    { code: "240", name: "ام دی اف ملامینه لیون تیره - LYON WALNUT DARK" }, { code: "245", name: "ام دی اف ملامینه نویز - NOISE" },
    { code: "246", name: "ام دی اف ملامینه بشیکتاش الم - BESHIKTASH ELM(001)" }, { code: "247", name: "ام دی اف ملامینه سیاه مازو - BLACK OAK" },
    { code: "250", name: "ام دی اف ملامینه کلیاف تیره - DARK CLEAF" }, { code: "249", name: "ام دی اف ملامینه میلانو والنات 1 - MILANO WALNUT 1" },
    { code: "251", name: "ام دی اف ملامینه میلانو والنات 2 - MILANO WALNUT 2" }, { code: "252", name: "ام دی اف ملامینه میلانو والنات 3 - MILANO WALNUT 3" },
    { code: "255", name: "ام دی اف ملامینه ملچ تیره - DARK MALACH" }, { code: "300", name: "ام دی اف ملامینه سفید متالیک - METALLIC WHITE" },
    { code: "304", name: "ام دی اف ملامینه متالیک کرم - METALLIC CREAM" }, { code: "305", name: "ام دی اف ملامینه متالیک بژ - METALLIC BEIGE" },
    { code: "306", name: "ام دی اف ملامینه نسکافه متالیک - METALIC CAPUCINO" }, { code: "315", name: "ام دی اف ملامینه متالیک نقره - METALLIC SILVER" },
    { code: "325", name: "ام دی اف ملامینه متالیک آنتراسیت - METALIC ANTRASIT" }, { code: "400", name: "ام دی اف ملامینه بتون سفید - CONCRETE WHITE" },
    { code: "405", name: "ام دی اف ملامینه بتون 5 - BETON 5" }, { code: "410", name: "ام دی اف ملامینه بتون 6 - BETON 6" },
    { code: "408", name: "ام دی اف ملامینه بتون 7 - BETON 7" }, { code: "406", name: "ام دی اف ملامینه بتون 8 - BETON 8" },
    { code: "411", name: "ام دی اف ملامینه بتون 9 - BETON 9" }, { code: "513", name: "ام دی اف ملامینه کتان سفید - WHITE LINEN" },
    { code: "514", name: "ام دی اف ملامینه کتان کرم - CREAM LINEN" }, { code: "515", name: "ام دی اف ملامینه توییست 1 - TWIST 1" },
    { code: "574", name: "ام دی اف ملامینه طرح سنگ سفید (3) - HARDSTONE WHITE (3)" }, { code: "575", name: "ام دی اف ملامینه طرح سنگ کرم (4) - HARDSTONE WHITE (4)" },
    { code: "576", name: "ام دی اف ملامینه طرح سنگ تیره(8) - HARDSTONE WHITE (8)" }
];

const highglossProducts = [
    { code: "10A100", name: "سفید مات" }, { code: "11A109", name: "مشکی مات" }, { code: "12A111", name: "آبی مات" },
    { code: "13A112", name: "سبز مات" }, { code: "15A101", name: "کرم مات" }, { code: "16A113", name: "سبززیتونی مات" },
    { code: "17A114", name: "آبی ملایم مات" }, { code: "18A115", name: "خاکستری A مت" }, { code: "19A116", name: "سبز بیشه مات" },
    { code: "20A102", name: "نسکافه مات" }, { code: "25A103", name: "خاکستری جدید مات" }, { code: "26A120", name: "پلاتین" },
    { code: "27A121", name: "بیانکو مات" }, { code: "28A122", name: "ذغالی مات" }, { code: "30A104", name: "خاکستری روشن مات" },
    { code: "35A105", name: "خاکستری تیره مات" }, { code: "36A106", name: "سفید متالیک مات" }, { code: "37A107", name: "کرم متالیک مات" },
    { code: "38A108", name: "گلکسی عسلی مات" }, { code: "39A110", name: "متالیک آنتراسیت مات" }, { code: "40A118", name: "مشکی متالیک مات" },
    { code: "42A119", name: "خاکستری روشن متالیک مات" }, { code: "101A76", name: "بتون خاکستری روشن" }, { code: "102A77", name: "سنگ قهوه ای" },
    { code: "103A78", name: "مرمر سیاه مات" }, { code: "106A83", name: "بنفش کروم" }, { code: "107A84", name: "خاکستری کروم" },
    { code: "115A52", name: "گلکسی عسلی" }, { code: "116A53", name: "گلکسی عسلی تیره" }, { code: "117A50", name: "متالیک سیلور" },
    { code: "118A82", name: "خاکستری متالیک شاین" }, { code: "135A27", name: "میلانو گردویی" }, { code: "151A61", name: "ماتریس مرواریدی" },
    { code: "154A60", name: "ماتریس سرخ" }, { code: "167A59", name: "ماتریس طلایی" }, { code: "170A62", name: "سفید متالیک" },
    { code: "171A64", name: "مشکی متالیک" }, { code: "172A65", name: "قهوه ای متالیک" }, { code: "173A70", name: "بنفش متالیک" },
    { code: "175A63", name: "کرم متالیک" }, { code: "181A75", name: "آلومینیوم طلایی مات" }, { code: "194A67", name: "آلومینیوم" },
    { code: "195A66", name: "متالیک آنتراسیت" }, { code: "199A74", name: "آلومینیوم طلایی" }, { code: "202A44", name: "بتون خاکستری تیره" },
    { code: "203A45", name: "بتون سفید" }, { code: "205A36", name: "ترا قهوه" }, { code: "206A35", name: "ترا شیری" },
    { code: "220A33", name: "تیک" }, { code: "225A34", name: "آبنوس" }, { code: "230A29", name: "اورگون گردویی" },
    { code: "261A26", name: "افرا روشن" }, { code: "262A124", name: "چوب خاکستری آنتی فینگر" }, { code: "263A125", name: "چوب نقره ای آنتی فینگر" },
    { code: "264A126", name: "چوب بژ آنتی فینگر" }, { code: "265A127", name: "چوب روشن آنتی فینگر" }, { code: "266A123", name: "چوب تیره آنتی فینگر" },
    { code: "300A06", name: "مشکی" }, { code: "301A15", name: "خاکستری تیره ( هایگلاس )" }, { code: "302A16", name: "خاکستری A براق ( هایگلاس )" },
    { code: "305A01", name: "سفید" }, { code: "306A12", name: "آبی کاربنی" }, { code: "315A04", name: "نسکافه" },
    { code: "320A13", name: "سبز زیتونی" }, { code: "330A08", name: "بنفش" }, { code: "335A03", name: "کرم" },
    { code: "346A11", name: "آبی" }, { code: "347A10", name: "سبز" }, { code: "350A05", name: "قهوه ای" },
    { code: "355A02", name: "بیانکو" }, { code: "360A07", name: "زرشکی" }, { code: "371A81", name: "آلومینیوم آنتی فینگر" },
    { code: "372A79", name: "آلومینیوم طلایی آنتی فینگر" }, { code: "373A80", name: "آینه" }
];

let currentUser = null; 
let currentWaybillId = null; 
let currentWarehouseType = 'si-tak';
let allWaybills = []; 
let products = [];
let isReadOnlyMode = false; 
let newAvatarBase64 = null;

// =========================================
// 2. Heartbeat
// =========================================
function keepSupabaseAlive() {
    setInterval(async () => {
        if (supabaseClient) {
            try { await supabaseClient.from('settings').select('id').limit(1); } catch (e) {}
        }
    }, 12 * 60 * 60 * 1000);
}

// =========================================
// 3. توابع کمکی
// =========================================
function forceEnglish(str) { if (!str) return ''; let s = str.toString(); s = s.replace(/[\u06F0-\u06F9]/g, match => String.fromCharCode(match.charCodeAt(0) - 1776)); s = s.replace(/[\u0660-\u0669]/g, match => String.fromCharCode(match.charCodeAt(0) - 1632)); return s; }
function getTodayEnglishDate() { try { return new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); } catch (e) { return forceEnglish(new Intl.DateTimeFormat('fa-IR').format(new Date())); } }

function showScreen(screenId) {
    const screens = ['loginScreen', 'changePassScreen', 'appMain'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (id === screenId) { el.classList.remove('hidden'); }
        else { el.classList.add('hidden'); }
    });
}

function showView(viewName, btnElement) {
    const dashboardView = document.getElementById('dashboardView');
    const waybillView = document.getElementById('waybillView');
    const pageTitle = document.getElementById('pageTitle');
    const menuItems = document.querySelectorAll('.menu-item');

    if (viewName === 'dashboard') {
        dashboardView.classList.remove('hidden');
        waybillView.classList.add('hidden');
        pageTitle.innerText = 'داشبورد';
        loadWaybills();
    } else if (viewName === 'waybill') {
        dashboardView.classList.add('hidden');
        waybillView.classList.remove('hidden');
        pageTitle.innerText = 'صدور / ویرایش حواله';
    }

    menuItems.forEach(item => item.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    else document.querySelector('.menu-item').classList.add('active');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

function customConfirm(message) {
    return new Promise((resolve) => {
        document.getElementById('confirmMessage').innerText = message;
        document.getElementById('customConfirmModal').classList.remove('hidden');
        window.confirmResolve = (result) => {
            document.getElementById('customConfirmModal').classList.add('hidden');
            resolve(result);
        };
    });
}

// =========================================
// 4. مدیریت پروفایل
// =========================================
function openProfileModal() {
    document.getElementById('editUsername').value = currentUser.username;
    document.getElementById('currentPassword').value = '';
    document.getElementById('editNewPassword').value = '';
    newAvatarBase64 = null;
    
    const modalAvatar = document.getElementById('modalAvatar');
    if (currentUser.avatar) modalAvatar.innerHTML = `<img src="${currentUser.avatar}" alt="Avatar"><div class="avatar-overlay">تغییر عکس</div>`;
    else modalAvatar.innerHTML = `<span>👤</span><div class="avatar-overlay">تغییر عکس</div>`;
    
    document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() { document.getElementById('profileModal').classList.add('hidden'); }

function uploadAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('حجم عکس نباید بیشتر از ۲ مگابایت باشد.', 'error'); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
        newAvatarBase64 = e.target.result;
        document.getElementById('modalAvatar').innerHTML = `<img src="${newAvatarBase64}" alt="Avatar"><div class="avatar-overlay">تغییر عکس</div>`;
    };
    reader.readAsDataURL(file);
}

async function saveProfileChanges() {
    const newUsername = document.getElementById('editUsername').value.trim();
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('editNewPassword').value;
    
    if (!newUsername) { showToast('نام کاربری نمی‌تواند خالی باشد.', 'error'); return; }
    let updates = { username: newUsername };
    if (newAvatarBase64) updates.avatar = newAvatarBase64;
    if (newPass) {
        if (newPass.length !== 4) { showToast('رمز جدید باید ۴ رقم باشد.', 'error'); return; }
        if (!currentPass) { showToast('برای تغییر رمز، رمز فعلی را وارد کنید.', 'error'); return; }
        if (currentPass !== currentUser.password) { showToast('رمز فعلی اشتباه است.', 'error'); return; }
        updates.password = newPass; updates.previous_password = currentUser.password; updates.last_password_change = new Date().toISOString();
    }

    try {
        const { error } = await supabaseClient.from('users').update(updates).eq('id', currentUser.id);
        if (error) throw error;
        showToast('پروفایل با موفقیت به‌روزرسانی شد.', 'success');
        closeProfileModal();
        Object.assign(currentUser, updates);
        updateUIProfile();
    } catch (err) { showToast('خطا در ذخیره تغییرات!', 'error'); }
}

function updateUIProfile() {
    document.getElementById('userNameDisplay').innerText = currentUser.username === 'mojtaba' ? 'مجتبی بیاتی' : (currentUser.username === 'mehdi' ? 'مهدی شیبک' : currentUser.username);
    const avatarHTML = currentUser.avatar ? `<img src="${currentUser.avatar}">` : `👤`;
    document.getElementById('sidebarAvatar').innerHTML = avatarHTML;
}

// =========================================
// 5. احراز هویت و لاگین
// =========================================
async function doLogin() {
    if (!supabaseClient) { showToast('خطا: اتصال به دیتابیس برقرار نیست!', 'error'); return; }
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('btnLogin');

    if (!password || password.length !== 4) { showToast('رمز عبور باید ۴ رقم باشد.', 'error'); return; }
    btn.innerText = 'در حال بررسی...'; btn.disabled = true;

    const { data: user, error } = await supabaseClient.from('users').select('*').eq('username', username).eq('password', password).single();

    if (error || !user) {
        showToast('نام کاربری یا رمز عبور اشتباه است.', 'error');
        btn.innerText = 'ورود به سیستم'; btn.disabled = false;
        return;
    }

    const lastChange = new Date(user.last_password_change);
    const diffDays = Math.floor((new Date() - lastChange) / (1000 * 60 * 60 * 24));

    if (diffDays >= 30) {
        currentUser = user; showScreen('changePassScreen');
        btn.innerText = 'ورود به سیستم'; btn.disabled = false;
    } else {
        completeLogin(user);
    }
}

async function completeLogin(user) {
    currentUser = user;
    updateUIProfile();
    document.getElementById('userRoleDisplay').innerText = user.role === 'sales' ? 'فروش' : 'انباردار';
    document.getElementById('currentDateDisplay').innerText = getTodayEnglishDate();
    
    if (user.role === 'sales') document.getElementById('navNewWaybill').style.display = 'flex';
    else document.getElementById('navNewWaybill').style.display = 'none';

    showScreen('appMain');
    document.getElementById('btnLogin').innerText = 'ورود به سیستم'; document.getElementById('btnLogin').disabled = false;

    updateDashboardStats(); renderDashboardTable();

    try {
        const [waybillsRes, productsRes] = await Promise.all([
            supabaseClient.from('waybills').select('*').order('id', { ascending: false }),
            supabaseClient.from('products').select('*')
        ]);
        if (waybillsRes.data) allWaybills = user.role === 'warehouse' ? waybillsRes.data.filter(w => ['pending', 'checked'].includes(w.status)) : waybillsRes.data;
        if (productsRes.data) {
            products = productsRes.data;
            if (products.length === 0) await seedDefaultProducts();
        }
        updateDashboardStats(); renderDashboardTable();
        showToast(`خوش آمدید`, 'success');
    } catch (err) { showToast('خطا در ارتباط با سرور', 'error'); }
}

async function seedDefaultProducts() {
    const defaultProducts = [];
    kafpooshProducts.forEach(p => defaultProducts.push({ code: p.code, name: p.name, type: "kafpoosh" }));
    highglossProducts.forEach(p => defaultProducts.push({ code: p.code, name: "ورق ام دی اف هایگلاس " + p.name, type: "highgloss" }));
    const { data, error } = await supabaseClient.from('products').insert(defaultProducts).select();
    if (!error && data) products = data;
}

async function changePassword() {
    if (!supabaseClient) return;
    const newPass = document.getElementById('newPassword').value;
    if (!/^\d{4}$/.test(newPass)) { showToast('رمز باید ۴ عدد باشد.', 'error'); return; }
    if (newPass === currentUser.password) { showToast('رمز جدید نباید با قبلی یکسان باشد.', 'error'); return; }

    const { error } = await supabaseClient.from('users').update({
        previous_password: currentUser.password, password: newPass, last_password_change: new Date().toISOString()
    }).eq('id', currentUser.id);

    if (error) { showToast('خطا در تغییر رمز!', 'error'); showScreen('loginScreen'); return; }
    currentUser.password = newPass; showToast('رمز تغییر یافت.', 'success'); completeLogin(currentUser);
}

function logout() { currentUser = null; document.getElementById('loginPassword').value = ''; showScreen('loginScreen'); }

// =========================================
// 6. داشبورد و جدول
// =========================================
async function loadWaybills() {
    if (!supabaseClient) return;
    let query = supabaseClient.from('waybills').select('*').order('id', { ascending: false });
    if (currentUser.role === 'warehouse') query = query.in('status', ['pending', 'checked']);
    const { data: waybills, error } = await query;
    if (error) return;
    allWaybills = waybills || []; updateDashboardStats(); renderDashboardTable();
}

function updateDashboardStats() {
    document.getElementById('statTotal').innerText = allWaybills.length;
    document.getElementById('statPending').innerText = allWaybills.filter(w => w.status === 'pending').length;
    document.getElementById('statChecked').innerText = allWaybills.filter(w => w.status === 'checked').length;
    document.getElementById('statReturned').innerText = allWaybills.filter(w => w.status === 'returned').length;
}

function renderDashboardTable() {
    const searchTerm = document.getElementById('dashboardSearch').value.trim().toLowerCase();
    const filterStatus = document.getElementById('dashboardFilter').value;
    const tbody = document.getElementById('waybillListBody');
    tbody.innerHTML = '';

    const filtered = allWaybills.filter(w => {
        const matchesSearch = w.waybill_number.toLowerCase().includes(searchTerm) || w.created_at.includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || w.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if(filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:30px; color:var(--text-muted);">هیچ حواله‌ای یافت نشد.</td></tr>`;
        return;
    }

    filtered.forEach(w => {
        let badgeClass = '', statusText = '';
        if (w.status === 'draft') { badgeClass = 'bg-draft'; statusText = 'پیش‌نویس'; }
        else if (w.status === 'pending') { badgeClass = 'bg-pending'; statusText = 'در انتظار انبار'; }
        else if (w.status === 'checked') { badgeClass = 'bg-checked'; statusText = 'کنترل شده'; }
        else if (w.status === 'returned') { badgeClass = 'bg-returned'; statusText = 'برگشت خورده'; }

        tbody.innerHTML += `
            <tr>
                <td style="font-weight:700; font-family:Tahoma;">${w.waybill_number}</td>
                <td style="font-weight:600; color:var(--text-muted);">${w.created_at.substring(0, 10)}</td>
                <td><span class="badge ${badgeClass}">${statusText}</span></td>
                <td><button class="btn btn-light" style="padding: 6px 12px; font-size: 12px;" onclick="openWaybill(${w.id})">مشاهده</button></td>
            </tr>
        `;
    });
}

// =========================================
// 7. فرم حواله (با همان منطق قبلی)
// =========================================
function getTableHeaderHTML(type) {
    if (type === 'kafpoosh') {
        return `<tr><th width="4%">ردیف</th><th width="10%">کد کالا</th><th width="25%">شرح کالا</th><th width="13%">طرح کروم</th><th width="8%">برند</th><th width="7%">درجه بندی</th><th width="9%">سایز</th><th width="7%">ضخامت</th><th width="7%">پشت کار کالا</th><th width="5%">واحد</th><th width="5%">مقدار</th><th width="3%" class="no-print">حذف</th></tr>`;
    }
    return `<tr><th width="4%">ردیف</th><th width="10%">کد کالا</th><th width="22%">شرح کالا</th><th width="9%">نایلون</th><th width="8%">برند</th><th width="8%">درجه بندی</th><th width="11%">سایز</th><th width="10%">ضخامت</th><th width="8%">پشت کار</th><th width="5%">واحد</th><th width="5%">تعداد</th><th width="3%" class="no-print">حذف</th></tr>`;
}

function createRowHTML(type) {
    if (type === 'kafpoosh') {
        return `
            <td class="row-num ltr-input"></td>
            <td><input type="text" class="search-code form-input ltr-input" oninput="smartSearch(this)" onfocus="smartSearch(this)" placeholder="کد..."><ul class="autocomplete-dropdown"></ul></td>
            <td><input type="text" class="search-name form-input" oninput="smartSearch(this)" onfocus="smartSearch(this)" placeholder="شرح..."><ul class="autocomplete-dropdown"></ul></td>
            <td><select class="form-input chrom-select" onchange="updateKafpooshCode(this)"><option value="فوق برجسته ی 1" selected>فوق برجسته ی 1</option><option value="فوق برجسته ی 2">فوق برجسته ی 2</option><option value="فوق برجسته ی 3">فوق برجسته ی 3</option><option value="برفی">برفی</option><option value="آینه ای">آینه ای</option><option value="سوپر مات">سوپر مات</option></select></td>
            <td><select class="form-input"><option value="کفپوش - ایرانی" selected>کفپوش - ایرانی</option><option value="کفپوش - خارجی">کفپوش - خارجی</option></select></td>
            <td><select class="form-input"><option value="درجه 1" selected>درجه 1</option><option value="درجه 2">درجه 2</option><option value="درجه 3">درجه 3</option></select></td>
            <td><input type="text" value="3660*1830" readonly class="form-input ltr-input"></td>
            <td><select class="form-input"><option value="میلی متر 16" selected>میلی متر 16</option><option value="میلی متر 18">میلی متر 18</option></select></td>
            <td><select class="form-input"><option value="ملامینه" selected>ملامینه</option><option value="بدون روکش">بدون روکش</option></select></td>
            <td><input type="text" value="عدد" readonly class="form-input"></td>
            <td><input type="text" class="qty form-input ltr-input" oninput="this.value = forceEnglish(this.value)"></td>
            <td class="no-print"><button class="btn-row-del" onclick="deleteRow(this)">✖</button></td>
        `;
    }
    return `
        <td class="row-num ltr-input"></td>
        <td><input type="text" class="search-code form-input ltr-input" oninput="smartSearch(this)" onfocus="smartSearch(this)" placeholder="کد..."><ul class="autocomplete-dropdown"></ul></td>
        <td><input type="text" class="search-name form-input" oninput="smartSearch(this)" onfocus="smartSearch(this)" placeholder="نام..."><ul class="autocomplete-dropdown"></ul></td>
        <td><select class="form-input"><option value="نایلون دار" selected>نایلون دار</option><option value="بدون نایلون">بدون نایلون</option></select></td>
        <td><select class="form-input"><option value="سی تک" selected>سی تک</option><option value="اشک">اشک</option></select></td>
        <td><select class="form-input"><option value="درجه 1" selected>درجه 1</option><option value="درجه 2">درجه 2</option><option value="درجه 3">درجه 3</option></select></td>
        <td><input type="text" value="2800*1220" readonly class="form-input ltr-input"></td>
        <td><select class="form-input"><option value="میلی متر 16" selected>میلی متر 16</option><option value="میلی متر 18">میلی متر 18</option></select></td>
        <td><select class="form-input"><option value="پی وی سی" selected>پی وی سی</option><option value="هایگلاس">هایگلاس</option></select></td>
        <td><input type="text" value="عدد" readonly class="form-input"></td>
        <td><input type="text" class="qty form-input ltr-input" oninput="this.value = forceEnglish(this.value)"></td>
        <td class="no-print"><button class="btn-row-del" onclick="deleteRow(this)">✖</button></td>
    `;
}

function startNewWaybill() {
    currentWaybillId = null;
    document.getElementById('warehouseSelect').value = 'si-tak';
    handleWarehouseChange(document.getElementById('warehouseSelect'));
    document.querySelector('.table-body').innerHTML = '';
    addRow(true);
    setFormEditable(true);
    updateButtonVisibility('draft');
}

async function openWaybill(id) {
    if (!supabaseClient) return;
    const { data: waybill, error } = await supabaseClient.from('waybills').select('*').eq('id', id).single();
    if (error || !waybill) { showToast('خطا در بارگذاری', 'error'); return; }

    currentWaybillId = waybill.id;
    document.getElementById('dashboardView').classList.add('hidden');
    document.getElementById('waybillView').classList.remove('hidden');
    document.getElementById('pageTitle').innerText = 'مشاهده / ویرایش حواله';

    document.getElementById('waybillNumber').value = waybill.waybill_number;
    document.getElementById('waybillDate').value = waybill.data.waybillDate || '';
    document.getElementById('printDate').value = waybill.data.printDate || '';
    document.getElementById('warehouseSelect').value = waybill.data.warehouseType || 'si-tak';
    currentWarehouseType = waybill.data.warehouseType || 'si-tak';
    
    document.getElementById('mainTableHead').innerHTML = getTableHeaderHTML(currentWarehouseType);
    document.getElementById('customerName').value = waybill.data.customerName || '';
    document.getElementById('isOfficial').value = waybill.data.isOfficial || '';
    document.getElementById('driverNameMain').value = waybill.data.driverName || '';
    document.getElementById('driverNameFooter').value = waybill.data.driverName || '';
    document.getElementById('vehicleType').value = waybill.data.vehicleType || 'خاور';
    document.getElementById('driverPhone').value = waybill.data.driverPhone || '';
    document.getElementById('carPlate').value = waybill.data.carPlate || '';
    document.getElementById('documentDesc').value = waybill.data.documentDesc || '';

    const tbody = document.querySelector('.table-body');
    tbody.innerHTML = '';
    if (waybill.data.rows && waybill.data.rows.length > 0) {
        waybill.data.rows.forEach(rowData => {
            addRow(true); 
            const lastRow = tbody.lastElementChild;
            const inputs = lastRow.querySelectorAll('input, select');
            inputs[0].value = rowData.code || '';
            inputs[1].value = rowData.name || '';
            inputs[2].value = rowData.nylonOrChrome || '';
            inputs[3].value = rowData.brand || '';
            inputs[4].value = rowData.grade || '';
            inputs[5].value = rowData.size || '';
            inputs[6].value = rowData.thickness || '';
            inputs[7].value = rowData.back || '';
            inputs[8].value = rowData.unit || '';
            inputs[9].value = rowData.qty || '';
        });
    } else { addRow(true); }

    if (currentUser.role === 'warehouse') {
        setFormEditable(false); 
        updateButtonVisibility(waybill.status);
    } else {
        if (waybill.status === 'draft' || waybill.status === 'returned') setFormEditable(true);
        else { setFormEditable(false); showToast('این حواله قفل است.', 'info'); }
        updateButtonVisibility(waybill.status);
    }
}

function setFormEditable(isEditable) {
    isReadOnlyMode = !isEditable;
    const elements = document.querySelectorAll('#waybillView input, #waybillView select, #waybillView .btn-row-del, #addRowContainer');
    elements.forEach(el => {
        if (el.id !== 'waybillNumber' && el.id !== 'printDate' && el.id !== 'waybillDate') el.disabled = !isEditable;
    });
}

function updateButtonVisibility(status) {
    ['btnSaveDraft', 'btnSendToWarehouse', 'btnCheckWarehouse', 'btnReturn', 'btnPrint'].forEach(id => { document.getElementById(id).style.display = 'none'; });
    if (currentUser.role === 'sales') {
        document.getElementById('btnPrint').style.display = 'flex';
        if (status === 'draft' || status === 'returned') {
            document.getElementById('btnSaveDraft').style.display = 'flex';
            document.getElementById('btnSendToWarehouse').style.display = 'flex';
        }
    } else if (currentUser.role === 'warehouse') {
        if (status === 'pending') {
            document.getElementById('btnCheckWarehouse').style.display = 'flex';
            document.getElementById('btnReturn').style.display = 'flex';
        } else if (status === 'checked') {
            document.getElementById('btnPrint').style.display = 'flex';
            document.getElementById('btnReturn').style.display = 'flex';
        }
    }
}

async function saveWaybill(newStatus) {
    if (!supabaseClient) return;
    if (currentUser.role === 'sales' && (newStatus === 'checked' || newStatus === 'returned')) return;
    if (currentUser.role === 'warehouse' && (newStatus === 'draft' || newStatus === 'pending')) return;

    const data = {
        printDate: document.getElementById('printDate').value,
        waybillDate: document.getElementById('waybillDate').value,
        warehouseType: document.getElementById('warehouseSelect').value,
        customerName: document.getElementById('customerName').value,
        isOfficial: document.getElementById('isOfficial').value,
        driverName: document.getElementById('driverNameMain').value,
        vehicleType: document.getElementById('vehicleType').value,
        driverPhone: document.getElementById('driverPhone').value,
        carPlate: document.getElementById('carPlate').value,
        documentDesc: document.getElementById('documentDesc').value,
        rows: []
    };

    document.querySelectorAll('.table-body tr').forEach(tr => {
        const inputs = tr.querySelectorAll('input, select');
        data.rows.push({
            code: inputs[0].value, name: inputs[1].value, nylonOrChrome: inputs[2].value,
            brand: inputs[3].value, grade: inputs[4].value, size: inputs[5].value,
            thickness: inputs[6].value, back: inputs[7].value, unit: inputs[8].value, qty: inputs[9].value
        });
    });

    try {
        if (currentWaybillId) {
            await supabaseClient.from('waybills').update({ status: newStatus, data: data, checked_at: newStatus === 'checked' ? new Date().toISOString() : null }).eq('id', currentWaybillId);
        } else {
            const { data: settings } = await supabaseClient.from('settings').select('waybill_count').eq('id', 1).single();
            let count = settings ? settings.waybill_count : 1;
            const waybillNum = forceEnglish(`${count} (دستی)`);
            data.waybillDate = getTodayEnglishDate(); data.printDate = data.waybillDate;

            const { data: newW, error } = await supabaseClient.from('waybills').insert([{
                waybill_number: waybillNum, status: newStatus, data: data, created_by: currentUser.username
            }]).select().single();

            if (error) throw error;
            currentWaybillId = newW.id;
            document.getElementById('waybillNumber').value = waybillNum;
            await supabaseClient.from('settings').update({ waybill_count: count + 1 }).eq('id', 1);
        }
        showToast('حواله با موفقیت ذخیره شد.', 'success');
        showView('dashboard', document.querySelector('.menu-item'));
    } catch (err) { showToast('خطا در ذخیره!', 'error'); }
}

async function handleWarehouseChange(selectElement) {
    const newType = selectElement.value === 'kafpoosh' ? 'kafpoosh' : 'si-tak';
    if (currentWarehouseType === newType) return;
    const userConfirmed = await customConfirm('تغییر نوع انبار باعث پاک شدن ردیف‌ها می‌شود. موافقید؟');
    if (userConfirmed) {
        currentWarehouseType = newType;
        document.querySelectorAll('.main-table thead').forEach(thead => { thead.innerHTML = getTableHeaderHTML(currentWarehouseType); });
        const tbody = document.querySelector('.table-body'); tbody.innerHTML = ''; addRow(true);
    } else { selectElement.value = currentWarehouseType === 'kafpoosh' ? 'kafpoosh' : 'si-tak'; }
}

function updateKafpooshCode(selectElement) {
    if (!selectElement) return;
    const row = selectElement.closest('tr'); const codeInput = row.querySelector('.search-code');
    if (!codeInput || !codeInput.value) return;
    let baseCode = codeInput.value.trim().replace(/^(WA|WB|WC|SA|M|GA)\s*/i, '').trim();
    let prefix = "";
    switch(selectElement.value) { case "فوق برجسته ی 1": prefix = "WA"; break; case "فوق برجسته ی 2": prefix = "WB"; break; case "فوق برجسته ی 3": prefix = "WC"; break; case "برفی": prefix = "SA"; break; case "آینه ای": prefix = "M"; break; case "سوپر مات": prefix = "GA"; break; }
    codeInput.value = prefix ? prefix + baseCode : baseCode;
}

function smartSearch(inputElement) {
    inputElement.value = forceEnglish(inputElement.value);
    const query = inputElement.value.trim().toLowerCase(); const td = inputElement.closest('td');
    const dropdown = td.querySelector('.autocomplete-dropdown'); const row = inputElement.closest('tr');
    if (query.length === 0) { dropdown.style.display = 'none'; return; }
    const currentType = currentWarehouseType === 'kafpoosh' ? 'kafpoosh' : 'highgloss';
    const matches = products.filter(p => p.type === currentType && (p.code.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)));
    if (matches.length === 0) { dropdown.style.display = 'none'; return; }
    dropdown.innerHTML = '';
    matches.forEach(m => {
        const li = document.createElement('li'); li.innerHTML = `<span style="font-family:Tahoma; font-weight:bold;">${m.code}</span> - ${m.name}`;
        li.onclick = function() {
            row.querySelector('.search-code').value = m.code; row.querySelector('.search-name').value = m.name; dropdown.style.display = 'none';
            if (currentType === 'kafpoosh') { const chromSelect = row.querySelector('.chrom-select'); if (chromSelect) updateKafpooshCode(chromSelect); }
        };
        dropdown.appendChild(li);
    });
    dropdown.style.display = 'block';
}

document.addEventListener('click', function(e) { if (!e.target.closest('td')) { document.querySelectorAll('.autocomplete-dropdown').forEach(d => d.style.display = 'none'); } });
function syncDriverName(val) { document.querySelectorAll('#driverNameFooter').forEach(el => el.value = val); }

async function addRow(skipPrompt = false) {
    let pages = document.querySelectorAll('.page'); let lastPage = pages[pages.length - 1]; let tbody = lastPage.querySelector('.table-body');
    let currentPageRows = tbody.querySelectorAll('tr').length;
    
    if (currentPageRows >= 10) { 
        const newPage = lastPage.cloneNode(true); 
        newPage.querySelector('.table-body').innerHTML = '';
        newPage.querySelector('.main-table thead').innerHTML = getTableHeaderHTML(currentWarehouseType);
        document.getElementById('pagesContainer').appendChild(newPage);
        lastPage = newPage; tbody = lastPage.querySelector('.table-body');
    }

    let duplicate = false;
    if (!skipPrompt && !isReadOnlyMode) { duplicate = await customConfirm('آیا مایلید اطلاعات ردیف قبل تکرار شود؟'); }

    let newTr = document.createElement('tr'); 
    if (duplicate && tbody.lastElementChild) {
        newTr = tbody.lastElementChild.cloneNode(true); newTr.querySelector('.qty').value = ''; 
        let drops = newTr.querySelectorAll('.autocomplete-dropdown'); drops.forEach(d => d.style.display = 'none');
    } else { newTr.innerHTML = createRowHTML(currentWarehouseType); }

    newTr.querySelector('.row-num').innerText = forceEnglish(tbody.querySelectorAll('tr').length + 1);
    tbody.appendChild(newTr);
    if(!isReadOnlyMode && !duplicate) newTr.querySelector('.search-code').focus();
}

async function deleteRow(btn) {
    const userConfirmed = await customConfirm('این ردیف حذف شود؟');
    if(userConfirmed) { let tr = btn.closest('tr'); tr.parentElement.removeChild(tr); renumberAllRows(); } 
}

function renumberAllRows() { let count = 1; document.querySelectorAll('.table-body tr').forEach(tr => { tr.querySelector('.row-num').innerText = forceEnglish(count++); }); }

function prepareAndPrint() {
    document.querySelectorAll('#pdfContainer input').forEach(input => input.value = forceEnglish(input.value));
    document.querySelectorAll('.row-num').forEach(el => el.innerText = forceEnglish(el.innerText));
    window.print();
}

// راه‌اندازی PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW failed:', err)); });
}
