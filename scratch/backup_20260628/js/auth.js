// ===== Firebase Configuration =====
const firebaseConfig = {
    apiKey: "AIzaSyCk2BJMJPgLCWcjkcGs2n-MU8-2b44nnOs",
    authDomain: "tea-planner-2.firebaseapp.com",
    databaseURL: "https://tea-planner-2-default-rtdb.firebaseio.com",
    projectId: "tea-planner-2",
    storageBucket: "tea-planner-2.firebasestorage.app",
    messagingSenderId: "933112271146",
    appId: "1:933112271146:web:1fee83c401b14f2b774e53"
};

let app, auth, db;
let isFirebaseReady = false;
let currentUser = null;
let isRemoteUpdate = false;
let currentBoardRef = null;
let globalAgendaRef = null; // Nova referência para agenda global

// Inicializa Firebase
try {
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey) {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.database();
        isFirebaseReady = true;
        console.log("Firebase initialized successfully.");

        auth.onAuthStateChanged(user => {
            currentUser = user;
            const loginBtn = document.getElementById('loginBtn');
            const userInfo = document.getElementById('userInfo');

            if (user) {
                loginBtn.textContent = 'Sair';
                loginBtn.classList.add('logged-in');
                loginBtn.style.background = '';
                loginBtn.style.color = '';
                userInfo.textContent = `Olá, ${user.displayName || user.email}`;
                setupFirebaseSync(user);
            } else {
                loginBtn.textContent = 'Login Google';
                loginBtn.classList.remove('logged-in');
                loginBtn.style.background = '#4285F4';
                loginBtn.style.color = 'white';
                userInfo.textContent = '';
                if (currentBoardRef) currentBoardRef.off();
                if (globalAgendaRef) globalAgendaRef.off();
            }
        });

        const loginBtnEl = document.getElementById('loginBtn');
        if (loginBtnEl) {
            loginBtnEl.addEventListener('click', () => {
                if (currentUser) {
                    auth.signOut();
                    window.location.reload();
                } else {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    auth.signInWithPopup(provider).catch(error => {
                        console.error("Erro no popup, tentando redirect...", error);
                        auth.signInWithRedirect(provider);
                    });
                }
            });
        }

    } else {
        console.warn("Offline mode or Firebase script not loaded.");
    }
} catch (e) {
    console.error("Error initializing Firebase:", e);
}
