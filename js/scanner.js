// Scanner Module - OCR and AI Flashcard Generation
const Scanner = {
    currentImage: null,
    extractedText: '',
    generatedCards: [],
    newDeckId: null,

    // Initialize scanner
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // File input handlers
        document.getElementById('camera-input').addEventListener('change', (e) => this.handleImageSelect(e));
        document.getElementById('file-input').addEventListener('change', (e) => this.handleImageSelect(e));

        // Action buttons
        document.getElementById('clear-image').addEventListener('click', () => this.clearImage());
        document.getElementById('scan-btn').addEventListener('click', () => this.scanImage());
        document.getElementById('edit-text-btn').addEventListener('click', () => this.toggleEditText());
        document.getElementById('generate-cards-btn').addEventListener('click', () => this.generateFlashcards());
        document.getElementById('add-more-cards').addEventListener('click', () => this.addManualCard());
        document.getElementById('save-generated-deck').addEventListener('click', () => this.saveDeck());
        document.getElementById('study-new-deck').addEventListener('click', () => this.studyNewDeck());
        document.getElementById('scan-another').addEventListener('click', () => this.resetScanner());
    },

    // Handle image selection
    handleImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Read and display the image
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImage = e.target.result;
            document.getElementById('preview-image').src = this.currentImage;
            this.showSection('preview');
        };
        reader.readAsDataURL(file);
    },

    // Clear current image
    clearImage() {
        this.currentImage = null;
        document.getElementById('preview-image').src = '';
        document.getElementById('camera-input').value = '';
        document.getElementById('file-input').value = '';
        this.showSection('upload');
    },

    // Scan image using Tesseract.js OCR
    async scanImage() {
        if (!this.currentImage) {
            alert('Please select an image first');
            return;
        }

        this.showSection('processing');
        this.updateProgress(0, 'Initializing OCR engine...');

        try {
            // Preprocess image for better OCR accuracy
            this.updateProgress(5, 'Preprocessing image...');
            const processedImage = await this.preprocessImage(this.currentImage);

            // Use Tesseract.js for OCR with optimized settings
            const result = await Tesseract.recognize(
                processedImage,
                'eng',
                {
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            const progress = Math.round(m.progress * 100);
                            this.updateProgress(progress, `Scanning text... ${progress}%`);
                        } else if (m.status === 'loading language traineddata') {
                            this.updateProgress(10, 'Loading language data...');
                        }
                    },
                    // Optimize for printed and handwritten text
                    tessedit_pageseg_mode: 6, // Assume uniform block of text
                    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:!?\'"-()[] ',
                    preserve_interword_spaces: 1
                }
            );

            this.extractedText = result.data.text.trim();

            if (!this.extractedText) {
                alert('No text found in the image. Please try with a clearer image.');
                this.showSection('preview');
                return;
            }

            // Clean up the extracted text
            this.extractedText = this.cleanText(this.extractedText);

            // Display extracted text
            document.getElementById('extracted-text').value = this.extractedText;

            // Auto-generate deck name based on first line
            const firstLine = this.extractedText.split('\n')[0].substring(0, 50);
            document.getElementById('scanner-deck-name').value = firstLine || 'Scanned Notes';

            // Award XP for scanning
            Gamification.addXP(25, 'Notes scanned!');

            this.showSection('text');

        } catch (error) {
            console.error('OCR Error:', error);
            alert('Error scanning image. Please try again.');
            this.showSection('preview');
        }
    },

    // Clean extracted text
    cleanText(text) {
        return text
            .replace(/\r\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/[^\S\n]+/g, ' ')
            .trim();
    },

    // Update progress bar
    updateProgress(percent, status) {
        document.getElementById('scan-progress-fill').style.width = `${percent}%`;
        document.getElementById('processing-status').textContent = status;
    },

    // Toggle text editing
    toggleEditText() {
        const textarea = document.getElementById('extracted-text');
        const btn = document.getElementById('edit-text-btn');

        if (textarea.readOnly) {
            textarea.readOnly = false;
            textarea.focus();
            btn.textContent = 'Done';
            btn.classList.add('btn-primary');
        } else {
            textarea.readOnly = true;
            this.extractedText = textarea.value;
            btn.textContent = 'Edit';
            btn.classList.remove('btn-primary');
        }
    },

    // Generate flashcards from extracted text using AI-like parsing
    generateFlashcards() {
        const text = document.getElementById('extracted-text').value;
        if (!text.trim()) {
            alert('No text to generate flashcards from');
            return;
        }

        this.showSection('processing');
        this.updateProgress(0, 'Analyzing text structure...');

        // Simulate AI processing with setTimeout
        setTimeout(() => {
            this.updateProgress(30, 'Identifying key concepts...');

            setTimeout(() => {
                this.updateProgress(60, 'Creating question-answer pairs...');

                setTimeout(() => {
                    // Parse text and generate cards
                    this.generatedCards = this.parseTextToCards(text);

                    this.updateProgress(100, 'Done!');

                    setTimeout(() => {
                        if (this.generatedCards.length === 0) {
                            alert('Could not generate flashcards. Try editing the text to include clear definitions or key points.');
                            this.showSection('text');
                            return;
                        }

                        this.renderGeneratedCards();
                        this.showSection('cards');

                        // Award XP for generating cards
                        Gamification.addXP(10 * this.generatedCards.length, `${this.generatedCards.length} cards generated!`);

                    }, 500);
                }, 800);
            }, 600);
        }, 400);
    },

    // Parse text into flashcards using various patterns
    parseTextToCards(text) {
        const cards = [];

        // Split into paragraphs/sections
        const sections = text.split(/\n\n+/);

        for (const section of sections) {
            const lines = section.split('\n').filter(l => l.trim());

            for (const line of lines) {
                // Skip very short lines
                if (line.length < 10) continue;

                // Pattern 1: "Term: Definition" or "Term - Definition"
                const colonMatch = line.match(/^([^:]+):\s*(.+)$/);
                if (colonMatch && colonMatch[1].length < 100) {
                    cards.push({
                        front: `What is ${colonMatch[1].trim()}?`,
                        back: colonMatch[2].trim()
                    });
                    continue;
                }

                const dashMatch = line.match(/^([^-]+)\s*-\s*(.+)$/);
                if (dashMatch && dashMatch[1].length < 100 && dashMatch[2].length > 10) {
                    cards.push({
                        front: `Define: ${dashMatch[1].trim()}`,
                        back: dashMatch[2].trim()
                    });
                    continue;
                }

                // Pattern 2: "Term = Definition"
                const equalsMatch = line.match(/^([^=]+)\s*=\s*(.+)$/);
                if (equalsMatch) {
                    cards.push({
                        front: equalsMatch[1].trim(),
                        back: equalsMatch[2].trim()
                    });
                    continue;
                }

                // Pattern 3: Numbered list items "1. Item" or "1) Item"
                const numberedMatch = line.match(/^\d+[\.\)]\s*(.+)$/);
                if (numberedMatch) {
                    const content = numberedMatch[1].trim();
                    // If it looks like a definition
                    if (content.includes(':') || content.includes(' is ') || content.includes(' are ')) {
                        const parts = content.split(/:\s*| is | are /);
                        if (parts.length >= 2) {
                            cards.push({
                                front: `What is/are ${parts[0].trim()}?`,
                                back: parts.slice(1).join(' ').trim()
                            });
                            continue;
                        }
                    }
                }

                // Pattern 4: Bullet points with definitions
                const bulletMatch = line.match(/^[•\-\*]\s*(.+)$/);
                if (bulletMatch) {
                    const content = bulletMatch[1].trim();
                    if (content.includes(':')) {
                        const parts = content.split(':');
                        if (parts.length >= 2 && parts[0].length < 80) {
                            cards.push({
                                front: `Explain: ${parts[0].trim()}`,
                                back: parts.slice(1).join(':').trim()
                            });
                            continue;
                        }
                    }
                }

                // Pattern 5: "X is Y" sentences
                const isMatch = line.match(/^(.{5,50})\s+(?:is|are|was|were)\s+(.{10,})$/i);
                if (isMatch) {
                    cards.push({
                        front: `What is ${isMatch[1].trim()}?`,
                        back: isMatch[2].trim()
                    });
                    continue;
                }

                // Pattern 6: Question and answer format
                const questionMatch = line.match(/^(What|Who|Where|When|Why|How|Which|Define).+\?$/i);
                if (questionMatch) {
                    // Look for answer in next line or after question
                    const idx = lines.indexOf(line);
                    if (idx < lines.length - 1) {
                        const answer = lines[idx + 1].trim();
                        if (answer && !answer.match(/^(What|Who|Where|When|Why|How|Which)/i)) {
                            cards.push({
                                front: line.trim(),
                                back: answer
                            });
                        }
                    }
                    continue;
                }

                // Pattern 7: Key terms in CAPS or **bold**
                const capsMatch = line.match(/([A-Z]{2,}[A-Z\s]*[A-Z]{2,})/);
                if (capsMatch) {
                    const term = capsMatch[1].trim();
                    const rest = line.replace(term, '').trim();
                    if (rest.length > 20) {
                        cards.push({
                            front: `What is ${term}?`,
                            back: rest.replace(/^[\s\-:]+/, '')
                        });
                        continue;
                    }
                }
            }
        }

        // If we found very few cards, try more aggressive parsing
        if (cards.length < 3) {
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);

            for (let i = 0; i < Math.min(sentences.length, 10); i++) {
                const sentence = sentences[i].trim();

                // Extract key noun phrases
                const words = sentence.split(/\s+/);
                if (words.length > 5) {
                    // Create a cloze-deletion style card
                    const keyWordIndex = Math.floor(words.length / 2);
                    const keyWord = words[keyWordIndex];

                    if (keyWord.length > 3 && !['the', 'and', 'but', 'for', 'with', 'that', 'this', 'from'].includes(keyWord.toLowerCase())) {
                        const question = sentence.replace(keyWord, '_____');
                        cards.push({
                            front: `Fill in the blank:\n${question}`,
                            back: keyWord
                        });
                    }
                }
            }
        }

        // Remove duplicates
        const unique = [];
        const seen = new Set();
        for (const card of cards) {
            const key = card.front.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(card);
            }
        }

        return unique.slice(0, 30); // Limit to 30 cards
    },

    // Render generated cards for review
    renderGeneratedCards() {
        const container = document.getElementById('generated-cards-list');
        document.getElementById('generated-count').textContent = `${this.generatedCards.length} cards`;

        container.innerHTML = this.generatedCards.map((card, index) => `
            <div class="generated-card" data-index="${index}">
                <div class="generated-card-content">
                    <div class="generated-card-front">
                        <label>Question/Front</label>
                        <textarea class="card-front-edit" data-index="${index}">${this.escapeHtml(card.front)}</textarea>
                    </div>
                    <div class="generated-card-back">
                        <label>Answer/Back</label>
                        <textarea class="card-back-edit" data-index="${index}">${this.escapeHtml(card.back)}</textarea>
                    </div>
                </div>
                <div class="generated-card-actions">
                    <button class="btn btn-small btn-danger delete-generated-card" data-index="${index}">Delete</button>
                </div>
            </div>
        `).join('');

        // Add event listeners for editing and deleting
        container.querySelectorAll('.card-front-edit, .card-back-edit').forEach(textarea => {
            textarea.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.classList.contains('card-front-edit') ? 'front' : 'back';
                this.generatedCards[index][field] = e.target.value;
            });
        });

        container.querySelectorAll('.delete-generated-card').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.generatedCards.splice(index, 1);
                this.renderGeneratedCards();
            });
        });
    },

    // Add manual card
    addManualCard() {
        this.generatedCards.push({
            front: '',
            back: ''
        });
        this.renderGeneratedCards();

        // Scroll to the new card
        const container = document.getElementById('generated-cards-list');
        container.scrollTop = container.scrollHeight;
    },

    // Save deck
    saveDeck() {
        // Filter out empty cards
        const validCards = this.generatedCards.filter(card =>
            card.front.trim() && card.back.trim()
        );

        if (validCards.length === 0) {
            alert('Please add at least one card with both front and back content');
            return;
        }

        const deckName = document.getElementById('scanner-deck-name').value.trim() || 'Scanned Notes';
        const subject = document.getElementById('scanner-subject').value;

        // Create new deck
        this.newDeckId = Flashcard.createDeck(deckName, subject);

        // Add cards to deck
        for (const card of validCards) {
            Flashcard.addCard(this.newDeckId, card.front, card.back);
        }

        // Record deck creation
        Gamification.recordDeckCreated();

        // Show success
        document.getElementById('success-message').textContent =
            `Created "${deckName}" with ${validCards.length} flashcards`;
        this.showSection('success');

        SoundFX.play('achievement');
        Gamification.showNotification('Deck Created!', `${validCards.length} cards ready to study`, 'achievement');
    },

    // Study the newly created deck
    studyNewDeck() {
        if (this.newDeckId) {
            App.currentDeckId = this.newDeckId;
            App.startStudySession();
        }
    },

    // Reset scanner for another scan
    resetScanner() {
        this.currentImage = null;
        this.extractedText = '';
        this.generatedCards = [];
        this.newDeckId = null;

        document.getElementById('preview-image').src = '';
        document.getElementById('extracted-text').value = '';
        document.getElementById('scanner-deck-name').value = '';
        document.getElementById('camera-input').value = '';
        document.getElementById('file-input').value = '';

        this.showSection('upload');
    },

    // Show specific section
    showSection(section) {
        const sections = ['upload', 'preview', 'processing', 'text', 'cards', 'success'];
        const sectionMap = {
            'upload': 'scanner-upload-section',
            'preview': 'scanner-preview',
            'processing': 'scanner-processing',
            'text': 'scanner-text',
            'cards': 'scanner-cards',
            'success': 'scanner-success'
        };

        sections.forEach(s => {
            const el = document.getElementById(sectionMap[s]);
            if (el) {
                el.style.display = s === section ? 'block' : 'none';
            }
        });

        // Show upload section by default
        if (section === 'upload') {
            document.querySelector('.scanner-upload-section').style.display = 'block';
        }
    },

    // Preprocess image for better OCR accuracy
    async preprocessImage(imageSrc) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas size
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Get image data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Convert to grayscale and increase contrast
                for (let i = 0; i < data.length; i += 4) {
                    // Grayscale
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

                    // Increase contrast
                    const contrast = 1.5;
                    const factor = (259 * (contrast * 100 + 255)) / (255 * (259 - contrast * 100));
                    const newValue = Math.min(255, Math.max(0, factor * (avg - 128) + 128));

                    // Apply threshold for cleaner text
                    const threshold = newValue > 140 ? 255 : 0;

                    data[i] = threshold;     // R
                    data[i + 1] = threshold; // G
                    data[i + 2] = threshold; // B
                }

                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.src = imageSrc;
        });
    },

    // Escape HTML for safe display
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize scanner when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Scanner.init();
});
