// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Welcome Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const welcomeModal = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('closeWelcomeModal');
    
    // Temporarily disabled check so you can see it for testing
    // if (!localStorage.getItem('welcomeSeen')) {
        setTimeout(() => {
            welcomeModal.classList.add('active');
        }, 800);
    // }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            welcomeModal.classList.remove('active');
            localStorage.setItem('welcomeSeen', 'true');
        });
    }

    const tutorialLink = document.getElementById('scrollToTutorial');
    if (tutorialLink) {
        tutorialLink.addEventListener('click', () => {
            welcomeModal.classList.remove('active');
            localStorage.setItem('welcomeSeen', 'true');
        });
    }
});

// Back to top button visibility
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active state in mobile nav if clicked from mobile nav
            if (this.classList.contains('mnav-item')) {
                document.querySelectorAll('.mnav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Mobile Navigation Active State on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.mnav-item').forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Platform Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding panel
        const targetTab = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(`tab-${targetTab}`);
        
        // (Removed broken popup call)

        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        
        // Lazy load iframes if they have data-src
        if (targetPanel) {
            const iframes = targetPanel.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                if (iframe.hasAttribute('data-src')) {
                    iframe.setAttribute('src', iframe.getAttribute('data-src'));
                    iframe.removeAttribute('data-src');
                }
            });
        }
    });
});

// Load iframes for the default active tab on page load
window.addEventListener('DOMContentLoaded', () => {
    const activePanel = document.querySelector('.tab-panel.active');
    if (activePanel) {
        const iframes = activePanel.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            if (iframe.hasAttribute('data-src')) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
                iframe.removeAttribute('data-src');
            }
        });
    }
});
// Chat widget toggle logic is defined below and handled by event listeners.

/* ─── CHAT WIDGET LOGIC ───────────────────────── */
function toggleChat(forceOpen = false) {
    const chatWindow = document.getElementById('chatWindow');
    const chatToggle = document.getElementById('chatToggle');
    const chatNotify = document.getElementById('chatNotify');
    
    if (!chatWindow || !chatToggle) return;

    if (forceOpen) {
        chatWindow.classList.add('active');
        chatToggle.classList.add('active');
        chatToggle.innerHTML = '<i class="ph ph-x"></i>';
    } else {
        chatWindow.classList.toggle('active');
        chatToggle.classList.toggle('active');
        if (chatToggle.classList.contains('active')) {
            chatToggle.innerHTML = '<i class="ph ph-x"></i>';
        } else {
            chatToggle.innerHTML = '<i class="ph-fill ph-chat-circle-dots"></i>';
        }
    }
    if (chatNotify) {
        chatNotify.style.display = 'none';
        chatNotify.style.opacity = '0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatNotify = document.getElementById('chatNotify');
    
    if (chatToggle) chatToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleChat();
    });
    
    if (chatNotify) chatNotify.addEventListener('click', (e) => {
        e.preventDefault();
        toggleChat(true);
    });

    // Auto-show notification after 2 seconds
    setTimeout(() => {
        const chatNotify = document.getElementById('chatNotify');
        const chatWindow = document.getElementById('chatWindow');
        if (chatNotify && chatWindow && !chatWindow.classList.contains('active')) {
            chatNotify.style.opacity = '1';
        }
    }, 2000);
});

const supportData = {
    'Android Issues': {
        msg: 'What kind of Android issue are you having?',
        options: ['Black Grass', 'Black Screen', 'Keyboard Crash', 'Emulator Freeze']
    },
    'iOS Issues': {
        msg: 'Select your iOS problem:',
        options: ['SideStore 2FA', 'SideStore Refresh', 'Game Crash', 'MeloNX Settings', 'MeloNX Welcome Freeze']
    },
    'Download Help': {
        msg: 'The <strong>GoFile</strong> link is the most reliable. Download the .nsp or .xci, then extract the zip!',
        options: ['Back to Start']
    },
    'Hardware Specs': {
        msg: '<strong>Minimum Requirements:</strong><br>• CPU: Snapdragon 700+<br>• RAM: 6GB+<br>• GPU: Adreno 600+ or Mali with drivers.',
        options: ['Back to Start']
    },
    'SideStore 2FA': {
        msg: '<strong>2FA Fix:</strong> If the code never arrives:<br>1. Go to iCloud.com in Safari.<br>2. Select "Use a different Apple ID".<br>3. Enter credentials and take the code that pops up.<br>4. Enter that code into SideStore instead of iCloud.',
        options: ['Back to Start']
    },
    'SideStore Refresh': {
        msg: '<strong>Important:</strong> You must refresh your apps in SideStore before they expire (every 7 days).<br>1. Turn on <strong>LocalDevVPN</strong>.<br>2. Open SideStore and hit Refresh.<br>3. Don\'t let them expire or you\'ll have to reinstall everything!',
        options: ['Back to Start']
    },
    'Black Grass': {
        msg: '<strong>Android Fix:</strong> Use the <strong>Citron Emulator</strong>. It specifically fixes the Black Grass, Black Screen, and keyboard problems! <br><br><a href="https://gofile.io/d/ng3S4h" target="_blank" style="color: var(--secondary); font-weight: bold; text-decoration: underline;">[Download Citron APK]</a> <br><br><strong>Alternative:</strong> Eden v3901 also has a fix.',
        img: 'assets/images/grass_fix.webp',
        options: ['Back to Start']
    },
    'Black Screen': {
        msg: '<strong>Android Fix:</strong> Use the <strong>Citron Emulator</strong>. This version is the most stable and fixes the Black Screen issue on start! <br><br><a href="https://gofile.io/d/ng3S4h" target="_blank" style="color: var(--secondary); font-weight: bold; text-decoration: underline;">[Download Citron APK]</a>',
        options: ['Back to Start']
    },
    'Keyboard Crash': {
        msg: '<strong>Android Fix:</strong> Use the <strong>Citron Emulator</strong>. This version is currently the best for Android as it supports full keyboard typing and avoids crashes! <br><br><a href="https://gofile.io/d/ng3S4h" target="_blank" style="color: var(--secondary); font-weight: bold; text-decoration: underline;">[Download Citron APK]</a> <br><br><strong>iOS Fix:</strong> Use the MeloNX 2.3.1 Fixed Version.',
        img: 'assets/images/tomodachi-life-problemfortyping.webp',
        options: ['Back to Start']
    },
    'MeloNX Welcome Freeze': {
        msg: '<strong>Fix:</strong> You should double tap the text "Welcome to MeloNX" to bypass the freeze (the text, not the button).',
        img: 'assets/images/melonx_welcome_freezebutton.jpg',
        options: ['Back to Start']
    },
    'Game Crash': {
        msg: '<strong>Troubleshooting:</strong><br>1. Ensure <strong>JIT</strong> is enabled (via StikDebug).<br>2. Check if you are using <strong>MeloNX 2.3.1 Fix</strong> for keyboard crashes.<br>3. Verify all settings match our <strong>Optimal Settings</strong> list.',
        img: 'assets/images/melonx_dev_will_release_new_vesrion_soon_for_melonx_tomdachi.jpg',
        options: ['Back to Start']
    },
    'MeloNX Settings': {
        msg: '<strong>Best Settings for iOS:</strong><br>• Shader Cache: On<br>• VSync: On<br>• Docked Mode: On<br>• Macro HLE: Off<br>• Resolution: 1.00<br>• Dual Mapped JIT: On<br>• Memory Manager: Host Unchecked<br>• Ignore Missing Services: On',
        options: ['Back to Start']
    },
    'Emulator Freeze': {
        msg: 'If your emulator freezes on start, ensure you have the correct prod.keys and firmware v22.1. On Android, using **Citron** prevents most freezes.',
        options: ['Back to Start']
    },
    'Back to Start': {
        msg: 'How else can I help you?',
        options: ['Android Issues', 'iOS Issues', 'Download Help', 'Hardware Specs']
    }
};

const optionIcons = {
    'Android Issues': '<i class="ph-fill ph-android-logo"></i> ',
    'iOS Issues': '<i class="ph-fill ph-apple-logo"></i> ',
    'Download Help': '<i class="ph-fill ph-download-simple"></i> ',
    'Hardware Specs': '<i class="ph-fill ph-cpu"></i> ',
    'Back to Start': '<i class="ph ph-arrow-left"></i> '
};

function handleOption(option) {
    // Add user message
    addMessage(option, 'user');
    
    // Simulate bot thinking
    setTimeout(() => {
        const data = supportData[option];
        if (data) {
            addMessage(data.msg, 'bot', data.img);
            if (data.options) {
                showOptions(data.options);
            }
        }
    }, 400);
}

function addMessage(text, sender, imgSrc = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message message--${sender}`;
    
    let content = text;
    if (imgSrc) {
        content += `<img src="${imgSrc}" class="chat-img" alt="Fix Preview">`;
    }
    
    msgDiv.innerHTML = content;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showOptions(options) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'chat-options';
    options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'chat-option';
        const icon = optionIcons[opt] || '';
        btn.innerHTML = `${icon}${opt}`;
        btn.onclick = () => handleOption(opt);
        optionsDiv.appendChild(btn);
    });
    chatBody.appendChild(optionsDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function resetChat() {
    chatBody.innerHTML = `
        <div class="message message--bot">
            Hello! I'm your Tomodachi Support assistant.
            
            <div style="background: rgba(61, 181, 231, 0.1); border: 1px solid rgba(61, 181, 231, 0.2); border-radius: 10px; padding: 10px; margin: 12px 0; border-left: 4px solid var(--primary); text-align: left;">
                <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">📲 iOS Setup Guide:</span>
                <div style="display: flex; gap: 5px;">
                    <a href="https://docs.google.com/document/d/1U0xe9uF3EJwEpi-_xmTTS5uzCMXP-S0Z/edit?usp=sharing&ouid=117750141242890927224&rtpof=true&sd=true" target="_blank" style="color: var(--primary); font-weight: 800; text-decoration: none; font-size: 0.8rem;">[READ ONLINE]</a>
                    <a href="assets/docs/ios_guide.docx" target="_blank" style="color: var(--text-muted); font-weight: 600; text-decoration: none; font-size: 0.8rem;">[DOWNLOAD]</a>
                </div>
            </div>

            What can I help you with?
        </div>
        <div class="chat-options">
            <div class="chat-option" onclick="handleOption('Android Issues')"><i class="ph-fill ph-android-logo"></i> Android Issues</div>
            <div class="chat-option" onclick="handleOption('iOS Issues')"><i class="ph-fill ph-apple-logo"></i> iOS Issues</div>
            <div class="chat-option" onclick="handleOption('Download Help')"><i class="ph-fill ph-download-simple"></i> Download Help</div>
            <div class="chat-option" onclick="handleOption('Hardware Specs')"><i class="ph-fill ph-cpu"></i> Hardware Specs</div>
        </div>
    `;
}
$js
