// JavaScript код для вкладок
document.addEventListener('DOMContentLoaded', function() {
    // Функция для форматирования даты
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Установка даты создания сайта (сегодняшняя дата)
    const creationDate = new Date();
    document.getElementById('creation-date').textContent = formatDate(creationDate);

    // Установка даты последнего обновления (сегодняшняя дата)
    const updateDate = new Date();
    document.getElementById('update-date').textContent = formatDate(updateDate);

    // Управление вкладками
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Скрыть все вкладки
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Убрать активный класс со всех кнопок
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Показать выбранную вкладку
        const activeTabContent = document.getElementById(tabId);
        if (activeTabContent) {
            activeTabContent.classList.add('active');
            activeTabContent.classList.add('fade-in');
            
            // Удалить класс анимации после ее завершения
            setTimeout(() => {
                activeTabContent.classList.remove('fade-in');
            }, 500);
        }

        // Добавить активный класс к нажатой кнопке
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Сохранить выбранную вкладку в localStorage
        localStorage.setItem('activeTab', tabId);
    }

    // Обработчики кликов по вкладкам
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Восстановить последнюю открытую вкладку из localStorage
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && document.getElementById(savedTab)) {
        switchTab(savedTab);
    } else {
        // По умолчанию показываем первую вкладку
        switchTab('tab1');
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми анимированными элементами
    const animatedElements = document.querySelectorAll('.tab-content.active section, .benefit-card, .news-item, .stat-card, .trainer-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Обновление наблюдаемых элементов при переключении вкладок
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Обновить наблюдаемые элементы после переключения вкладки
            setTimeout(() => {
                const newAnimatedElements = document.querySelectorAll('.tab-content.active section, .benefit-card, .news-item, .stat-card, .trainer-card');
                newAnimatedElements.forEach(el => {
                    observer.observe(el);
                });
            }, 100);
        });
    });
});

// Функция для перехода к курсу
function goToCourse(tabId) {
    // Переключаемся на нужную вкладку с курсом
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Скрыть все вкладки
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Убрать активный класс со всех кнопок
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Показать выбранную вкладку
    const activeTabContent = document.getElementById(tabId);
    if (activeTabContent) {
        activeTabContent.classList.add('active');
        activeTabContent.classList.add('fade-in');
        
        // Удалить класс анимации после ее завершения
        setTimeout(() => {
            activeTabContent.classList.remove('fade-in');
        }, 500);
        
        // Прокрутить к началу вкладки
        activeTabContent.scrollIntoView({ behavior: 'smooth' });
    }

    // Добавить активный класс к соответствующей кнопке в навигации
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Сохранить выбранную вкладку в localStorage
    localStorage.setItem('activeTab', tabId);
}

// Функция для записи на курс
function enrollToCourse(courseName, trainerName) {
    // Здесь можно подключить реальную платежную систему
    // В данном примере просто покажем модальное окно с информацией
    
    const paymentUrl = `https://payment.cyberstart.pro/enroll?course=${encodeURIComponent(courseName)}&trainer=${encodeURIComponent(trainerName)}`;
    
    // Открываем страницу оплаты в новом окне
    window.open(paymentUrl, '_blank');
    
    // Или показываем модальное окно с информацией
    alert(`Вы выбрали курс "${courseName}" с тренером ${trainerName}.\n\nДля завершения записи и оплаты перейдите по ссылке: ${paymentUrl}\n\nПосле оплаты с вами свяжется тренер для согласования времени первого занятия.`);
    
    // В реальном проекте здесь должен быть редирект на платежную систему
    // window.location.href = paymentUrl;
}