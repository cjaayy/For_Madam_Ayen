        let roseInterval;
        let audio;
        let isPlaying = false;

        // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {
            createFrontFloatingRoses();
            initializeAudio();
        });

        // Initialize audio
        function initializeAudio() {
            audio = document.getElementById('backgroundMusic');
            const volumeSlider = document.getElementById('volumeSlider');
            
            // Set initial volume
            if (audio) {
                audio.volume = volumeSlider.value / 100;
            }
            
            // Handle audio events
            if (audio) {
                audio.addEventListener('loadeddata', function() {
                    console.log('Audio loaded successfully');
                });
                
                audio.addEventListener('error', function(e) {
                    console.log('Audio loading error:', e);
                });
                
                audio.addEventListener('canplaythrough', function() {
                    console.log('Audio can play through');
                });
            }
        }

        // Play/Pause functionality
        function togglePlayPause() {
            const playPauseBtn = document.getElementById('playPauseBtn');
            
            if (isPlaying) {
                pauseAudio();
                playPauseBtn.innerHTML = '<span class="play-icon">▶️</span><div class="music_note">♪</div>';
                playPauseBtn.classList.remove('playing');
                isPlaying = false;
            } else {
                playPauseBtn.classList.add('loading');
                playAudio();
            }
        }

        function playAudio() {
            const playPauseBtn = document.getElementById('playPauseBtn');
            
            if (audio) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Audio started playing');
                        isPlaying = true;
                        playPauseBtn.classList.remove('loading');
                        playPauseBtn.classList.add('playing');
                        playPauseBtn.innerHTML = '<div class="pause-icon"></div><div class="music_note">♪</div>';
                    }).catch(error => {
                        console.log('Audio play failed:', error);
                        playPauseBtn.classList.remove('loading');
                        playPauseBtn.innerHTML = '<span class="play-icon">▶️</span><div class="music_note">♪</div>';
                        isPlaying = false;
                    });
                }
            }
        }

        function pauseAudio() {
            const playPauseBtn = document.getElementById('playPauseBtn');
            
            if (audio) {
                audio.pause();
                isPlaying = false;
                playPauseBtn.classList.remove('playing', 'loading');
                playPauseBtn.innerHTML = '<span class="play-icon">▶️</span><div class="music_note">♪</div>';
            }
        }

        // Volume control
        function changeVolume() {
            const volumeSlider = document.getElementById('volumeSlider');
            const volume = volumeSlider.value / 100;
            
            if (audio) {
                audio.volume = volume;
            }
        }

        // Create floating roses for front page
        function createFrontFloatingRoses() {
            const container = document.getElementById('frontFloatingRoses');
            const roseCount = 15;
            
            for (let i = 0; i < roseCount; i++) {
                const rose = document.createElement('div');
                rose.className = 'front-floating-rose';
                rose.innerHTML = '🌹';
                rose.style.left = Math.random() * 100 + '%';
                rose.style.top = Math.random() * 100 + '%';
                rose.style.animationDelay = Math.random() * 10 + 's';
                rose.style.animationDuration = (Math.random() * 5 + 8) + 's';
                container.appendChild(rose);
            }
        }

        // Open letter function
        function openLetter() {
            const frontPage = document.getElementById('frontPage');
            const letterPage = document.getElementById('letterPage');
            const audioControls = document.getElementById('audioControls');
            
            // Hide front page with slide up animation
            frontPage.classList.add('slide-up');
            
            // Show letter page after a delay
            setTimeout(() => {
                letterPage.classList.add('show');
                audioControls.style.display = 'flex';
                startRoseRain();
                createBackgroundRoses();
                
                // Auto-play the audio when letter opens
                setTimeout(() => {
                    playAudio();
                }, 1000); // Small delay to ensure everything is loaded
            }, 800);
        }

        // Create background roses with better positioning
        function createBackgroundRoses() {
            // Clear existing background roses
            document.querySelectorAll('.floating-rose, .corner-rose, .scattered-rose').forEach(rose => {
                rose.remove();
            });

            // Create corner roses
            const corners = [
                { class: 'top-left', emoji: '🌹' },
                { class: 'top-right', emoji: '🌺' },
                { class: 'bottom-left', emoji: '🌸' },
                { class: 'bottom-right', emoji: '🌹' }
            ];

            corners.forEach(corner => {
                const rose = document.createElement('div');
                rose.className = `corner-rose ${corner.class}`;
                rose.innerHTML = corner.emoji;
                document.body.appendChild(rose);
            });

            // Create floating roses in strategic positions
            const floatingPositions = [
                { x: 15, y: 30, size: 'medium', color: '#e91e63', emoji: '🌹' },
                { x: 85, y: 25, size: 'small', color: '#9c27b0', emoji: '🌺' },
                { x: 25, y: 60, size: 'large', color: '#ab47bc', emoji: '🌸' },
                { x: 75, y: 55, size: 'medium', color: '#e91e63', emoji: '🌹' },
                { x: 10, y: 80, size: 'small', color: '#ba68c8', emoji: '🌺' },
                { x: 90, y: 75, size: 'medium', color: '#e91e63', emoji: '🌹' },
                { x: 45, y: 20, size: 'small', color: '#9c27b0', emoji: '🌸' },
                { x: 55, y: 85, size: 'large', color: '#ab47bc', emoji: '🌹' },
                { x: 35, y: 45, size: 'medium', color: '#e91e63', emoji: '🌺' },
                { x: 65, y: 35, size: 'small', color: '#9c27b0', emoji: '🌸' }
            ];

            floatingPositions.forEach((pos, index) => {
                const rose = document.createElement('div');
                rose.className = `floating-rose ${pos.size}`;
                rose.innerHTML = pos.emoji;
                rose.style.left = pos.x + '%';
                rose.style.top = pos.y + '%';
                rose.style.color = pos.color;
                rose.style.animationDelay = (index * 0.5) + 's';
                document.body.appendChild(rose);
            });

            // Create scattered roses
            const scatteredCount = 15;
            for (let i = 0; i < scatteredCount; i++) {
                const rose = document.createElement('div');
                rose.className = 'scattered-rose';
                
                const roseTypes = ['🌹', '🌺', '🌸', '🥀'];
                const colors = ['#e91e63', '#9c27b0', '#ab47bc', '#ba68c8', '#ce93d8'];
                
                rose.innerHTML = roseTypes[Math.floor(Math.random() * roseTypes.length)];
                rose.style.left = Math.random() * 100 + '%';
                rose.style.top = Math.random() * 100 + '%';
                rose.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
                rose.style.color = colors[Math.floor(Math.random() * colors.length)];
                rose.style.animationDelay = Math.random() * 8 + 's';
                rose.style.animationDuration = (Math.random() * 4 + 8) + 's';
                
                document.body.appendChild(rose);
            }

            // Create rose petals
            createRosePetals();
        }

        // Create rose petals effect
        function createRosePetals() {
            const petalContainer = document.createElement('div');
            petalContainer.className = 'petal-container';
            petalContainer.style.position = 'fixed';
            petalContainer.style.top = '0';
            petalContainer.style.left = '0';
            petalContainer.style.width = '100%';
            petalContainer.style.height = '100%';
            petalContainer.style.pointerEvents = 'none';
            petalContainer.style.zIndex = '1';
            document.body.appendChild(petalContainer);

            // Create petals periodically
            const petalInterval = setInterval(() => {
                if (!document.getElementById('letterPage').classList.contains('show')) {
                    clearInterval(petalInterval);
                    if (petalContainer.parentNode) {
                        petalContainer.parentNode.removeChild(petalContainer);
                    }
                    return;
                }

                const petal = document.createElement('div');
                petal.className = 'rose-petal';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.animationDuration = (Math.random() * 4 + 6) + 's';
                petal.style.animationDelay = Math.random() * 2 + 's';
                
                const petalColors = [
                    'radial-gradient(circle, #e91e63, #9c27b0)',
                    'radial-gradient(circle, #ab47bc, #ba68c8)',
                    'radial-gradient(circle, #9c27b0, #e91e63)',
                    'radial-gradient(circle, #ce93d8, #ab47bc)'
                ];
                
                petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
                petalContainer.appendChild(petal);

                // Remove petal after animation
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 10000);
            }, 1500);
        }

        // Enhanced rose rain effect
        function startRoseRain() {
            const roseRain = document.getElementById('roseRain');
            
            roseInterval = setInterval(() => {
                const rose = document.createElement('div');
                rose.className = 'rose';
                
                const roseTypes = ['🌹', '🌺', '🌸'];
                const colors = ['#e91e63', '#9c27b0', '#ab47bc', '#ba68c8'];
                
                rose.innerHTML = roseTypes[Math.floor(Math.random() * roseTypes.length)];
                rose.style.left = Math.random() * 100 + '%';
                rose.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
                rose.style.color = colors[Math.floor(Math.random() * colors.length)];
                rose.style.animation = `fall ${Math.random() * 4 + 5}s linear forwards`;
                rose.style.animationDelay = Math.random() * 2 + 's';
                
                roseRain.appendChild(rose);
                
                // Remove rose after animation
                setTimeout(() => {
                    if (rose.parentNode) {
                        rose.parentNode.removeChild(rose);
                    }
                }, 9000);
            }, 800);
        }

        function stopRoseRain() {
            if (roseInterval) {
                clearInterval(roseInterval);
                roseInterval = null;
            }
            
            // Clear existing roses
            const roseRain = document.getElementById('roseRain');
            if (roseRain) {
                roseRain.innerHTML = '';
            }

            // Clear background roses
            document.querySelectorAll('.floating-rose, .corner-rose, .scattered-rose, .petal-container').forEach(element => {
                element.remove();
            });
        }

        // Go back function
        function goBack() {
            const frontPage = document.getElementById('frontPage');
            const letterPage = document.getElementById('letterPage');
            const audioControls = document.getElementById('audioControls');
            
            // Hide letter page
            letterPage.classList.remove('show');
            audioControls.style.display = 'none';
            
            // Stop audio
            if (isPlaying) {
                pauseAudio();
                isPlaying = false;
            }
            
            // Stop all rose effects
            stopRoseRain();
            
            // Show front page after a delay
            setTimeout(() => {
                frontPage.classList.remove('slide-up');
            }, 300);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Space bar to toggle play/pause
            if (event.code === 'Space' && document.getElementById('letterPage').classList.contains('show')) {
                event.preventDefault();
                togglePlayPause();
            }
            
            // Escape to go back
            if (event.code === 'Escape' && document.getElementById('letterPage').classList.contains('show')) {
                event.preventDefault();
                goBack();
            }
        });

        // Prevent context menu on mobile
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // Handle visibility change (pause audio when tab is not visible)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isPlaying) {
                pauseAudio();
            }
        });

        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Performance optimization: throttle resize events
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Recalculate positions if needed
                createFrontFloatingRoses();
            }, 250);
        });