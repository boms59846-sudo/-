/**
 * auth-guard.js
 * Handles basic authentication checks and user session management.
 * Note: This is a basic implementation. For production, integrate with a real backend.
 */

const STORAGE_KEY = 'cice_user';

function protectPage() {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        redirectToLogin();
    }
}

function getCurrentUser() {
    try {
        const userStr = localStorage.getItem(STORAGE_KEY);
        if (userStr) {
            return JSON.parse(userStr);
        }
    } catch (e) {
        console.error('Error parsing user data', e);
    }
    return null;
}

function redirectToLogin() {
    const path = window.location.pathname;

    // Admin Pages
    if (path.includes('dashboardAdmin')) {
        window.location.href = 'login_admin.html';
        return;
    }

    // Evaluator Pages (including sub-pages like estimate, graph, list)
    if (path.includes('dashboardEvaluator') ||
        path.includes('estimate') ||
        path.includes('assessor_list') ||
        path.includes('graph_evaluation')) {
        window.location.href = 'login_evaluator.html';
        return;
    }

    // Default: Personnel / Appraisee
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem(STORAGE_KEY);
    redirectToLogin();
}
