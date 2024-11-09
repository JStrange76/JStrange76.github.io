document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const modal = document.getElementById('programModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.querySelector('.close-btn');
    const programCards = document.querySelectorAll('.program-card');

    // Add click handlers to all program cards
    programCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the content from the clicked card
            const title = this.querySelector('h3').textContent;
            const content = this.querySelector('.expanded-content').innerHTML;
            
            // Update modal content
            modalTitle.textContent = title;
            modalText.innerHTML = content;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Ninja Class
class NinjaMaster {
    constructor() {
        this.ninja = document.createElement('div');
        this.ninja.className = 'pixel-ninja';
        this.ninja.innerHTML = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="4" width="8" height="4" fill="black"/>
            <rect x="8" y="8" width="16" height="4" fill="black"/>
            <rect x="12" y="12" width="8" height="4" fill="#cc0000"/>
            <rect x="8" y="16" width="16" height="4" fill="black"/>
            <rect x="4" y="20" width="24" height="4" fill="black"/>
            <rect x="8" y="24" width="4" height="4" fill="black"/>
            <rect x="20" y="24" width="4" height="4" fill="black"/>
            <rect x="12" y="12" width="2" height="2" fill="white"/>
            <rect x="18" y="12" width="2" height="2" fill="white"/>
        </svg>`;
        document.body.appendChild(this.ninja);
        
        this.isActive = false;
        this.currentPosition = { x: 0, y: 0 };
        this.setupEvents();
        this.startNinjaRoutine();
    }

    setupEvents() {
        this.ninja.addEventListener('click', () => this.disappear());
    }

    appear() {
        if (this.isActive) return;
        
        const positions = [
            { x: 20, y: 20 },
            { x: window.innerWidth - 100, y: 20 },
            { x: 20, y: window.innerHeight - 100 },
            { x: window.innerWidth - 100, y: window.innerHeight - 100 }
        ];

        const randomPos = positions[Math.floor(Math.random() * positions.length)];
        this.currentPosition = randomPos;
        
        this.ninja.style.left = `${randomPos.x}px`;
        this.ninja.style.top = `${randomPos.y}px`;
        this.ninja.classList.add('active');
        this.isActive = true;

        this.startJumping();
    }

    startJumping() {
        if (!this.isActive) return;

        const jump = () => {
            if (!this.isActive) return;

            const newX = this.currentPosition.x + (Math.random() - 0.5) * 200;
            const newY = this.currentPosition.y + (Math.random() - 0.5) * 200;

            // Keep ninja within viewport bounds
            this.currentPosition = {
                x: Math.min(Math.max(0, newX), window.innerWidth - 32),
                y: Math.min(Math.max(0, newY), window.innerHeight - 32)
            };

            this.ninja.style.left = `${this.currentPosition.x}px`;
            this.ninja.style.top = `${this.currentPosition.y}px`;
            this.ninja.classList.add('flip');

            setTimeout(() => {
                this.ninja.classList.remove('flip');
            }, 300);

            setTimeout(jump, Math.random() * 2000 + 1000);
        };

        jump();
    }

    disappear() {
        this.ninja.classList.add('poof');
        this.isActive = false;
        
        setTimeout(() => {
            this.ninja.classList.remove('active', 'poof');
        }, 300);
    }

    startNinjaRoutine() {
        const checkProbability = () => {
            if (!this.isActive && Math.random() < 0.3) { // 30% chance to appear
                this.appear();
            }
            setTimeout(checkProbability, 5000); // Check every 5 seconds
        };

        checkProbability();
    }
}

// Initialize the ninja with the random chance
if (Math.random() < 0.3) {
    document.addEventListener('DOMContentLoaded', () => {
        window.ninjaMaster = new NinjaMaster();
    });
}
