const questionText = document.getElementById('question-text');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');
const btnSubmit = document.getElementById('btn-submit');
const thankyouContainer = document.getElementById('thankyou-container');

const chkEat = document.getElementById('chk-eat');
const eatSubMenu = document.getElementById('eat-sub-menu');

let noClickCount = 0;
let yesBaseSize = 1.2;
let yesBasePadding = 12;
let yesBasePaddingSide = 35;
let noBaseSize = 1.2;
let noBasePadding = 12;
let noBasePaddingSide = 35;

btnNo.addEventListener('click', () => {
    noClickCount++;

    if (noClickCount === 1) {
        questionText.textContent = "Đồng ý đi mà 🥺";
        
        noBaseSize *= 0.8;
        noBasePadding *= 0.8;
        noBasePaddingSide *= 0.8;
        btnNo.style.fontSize = `${noBaseSize}em`;
        btnNo.style.padding = `${noBasePadding}px ${noBasePaddingSide}px`;
        
        yesBaseSize *= 1.3;
        yesBasePadding *= 1.2;
        yesBasePaddingSide *= 1.2;
        btnYes.style.fontSize = `${yesBaseSize}em`;
        btnYes.style.padding = `${yesBasePadding}px ${yesBasePaddingSide}px`;

    } else if (noClickCount === 2) {
        questionText.textContent = "T thích m 💖";
        
        noBaseSize *= 0.6;
        noBasePadding *= 0.6;
        noBasePaddingSide *= 0.6;
        btnNo.style.fontSize = `${noBaseSize}em`;
        btnNo.style.padding = `${noBasePadding}px ${noBasePaddingSide}px`;
        
        yesBaseSize *= 1.4;
        yesBasePadding *= 1.2;
        yesBasePaddingSide *= 1.2;
        btnYes.style.fontSize = `${yesBaseSize}em`;
        btnYes.style.padding = `${yesBasePadding}px ${yesBasePaddingSide}px`;

    } else if (noClickCount >= 3) {
        questionText.textContent = "Làm ny t nhé 💕";
        btnNo.style.display = 'none'; // Hide No button
        
        yesBaseSize *= 1.2;
        yesBasePadding *= 1.2;
        yesBasePaddingSide *= 1.2;
        btnYes.style.fontSize = `${yesBaseSize}em`;
        btnYes.style.padding = `${yesBasePadding}px ${yesBasePaddingSide}px`;
    }
});

btnYes.addEventListener('click', () => {
    questionContainer.classList.add('hidden');
    successContainer.classList.remove('hidden');
    // Muted pink gradient for success screen
    document.body.style.background = "linear-gradient(135deg, #ffb6c1 0%, #ff8da1 100%)";
});

// Toggle restaurant sub-menu
chkEat.addEventListener('change', (e) => {
    if (e.target.checked) {
        eatSubMenu.classList.remove('hidden');
    } else {
        eatSubMenu.classList.add('hidden');
    }
});

btnSubmit.addEventListener('click', () => {
    // 1. Gather all selected data
    const activities = [];
    document.querySelectorAll('input[name="activity"]:checked').forEach(cb => {
        activities.push(cb.value);
    });

    const restaurants = [];
    document.querySelectorAll('input[name="restaurant"]:checked').forEach(cb => {
        restaurants.push(cb.value);
    });

    const dateTime = document.getElementById('date-time-picker').value;

    // 2. Format the text for the file
    let fileContent = "=== CÂU TRẢ LỜI CỦA CRUSH ===\r\n\r\n";
    fileContent += `Lời phản hồi nhận được lúc: ${new Date().toLocaleString('vi-VN')}\r\n\r\n`;
    fileContent += `Các hoạt động muốn làm: ${activities.length > 0 ? activities.join(', ') : 'Không chọn'}\r\n`;
    
    if (activities.includes('đi ăn') && restaurants.length > 0) {
        fileContent += `Đặc biệt muốn đi ăn: ${restaurants.join(', ')}\r\n`;
    }

    if (dateTime) {
        const dt = new Date(dateTime);
        const formattedDate = `${dt.getHours()}h${dt.getMinutes() === 0 ? '00' : dt.getMinutes()} ngày ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
        fileContent += `Thời gian hẹn hò: ${formattedDate}\r\n`;
    } else {
        fileContent += `Thời gian hẹn hò: Chưa quyết định (Chờ xếp lịch sau)\r\n`;
    }
    
    fileContent += "\r\n=== Yêu lắm cơ ===";

    // 3. Create and trigger download of the text file
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "CauTraLoiCuaCrush.txt";
    
    // Append link, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 4. Show thank you screen
    successContainer.classList.add('hidden');
    thankyouContainer.classList.remove('hidden');
    createHearts(40); // Burst of hearts at the end
});

// Floating Hearts Animation Logic
function createHearts(count) {
    const container = document.getElementById('falling-hearts');
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // 3-6s fall
            heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem'; // 1-2.5rem
            heart.style.opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8 opacity
            container.appendChild(heart);
            
            // Cleanup after animation finishes
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 150); // Stagger the spawn
    }
}

// Continuous background hearts
setInterval(() => createHearts(1), 800);
