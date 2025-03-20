/**
 * 大喜館 - ビジネス温泉旅館 JavaScript
 * モバイルメニュー、スムーススクロール、フォームバリデーションなどの機能を実装
 */

document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースタイル変更（スクロール時）
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // モバイルメニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // メニュー項目をクリックしたらメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // スムーススクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 予約フォームバリデーション
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易バリデーション
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // チェックイン・チェックアウト日の検証
            const checkInDate = new Date(document.getElementById('check-in').value);
            const checkOutDate = new Date(document.getElementById('check-out').value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkInDate < today) {
                isValid = false;
                document.getElementById('check-in').classList.add('error');
                alert('チェックイン日は今日以降の日付を選択してください。');
            }
            
            if (checkOutDate <= checkInDate) {
                isValid = false;
                document.getElementById('check-out').classList.add('error');
                alert('チェックアウト日はチェックイン日より後の日付を選択してください。');
            }
            
            // フォーム送信処理（実際にはサーバーに送信する処理を実装）
            if (isValid) {
                alert('予約リクエストを受け付けました。24時間以内に確認のご連絡をいたします。');
                bookingForm.reset();
            }
        });
        
        // エラー表示のリセット
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }

    // 日付入力フィールドの最小値を今日に設定
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        
        dateInputs.forEach(input => {
            input.setAttribute('min', todayString);
        });
    }
});
