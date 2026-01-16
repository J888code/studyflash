/* ============================================
   CODEQUEST - Lesson Content Data
   All paths and lesson definitions
   ============================================ */

const LessonData = {
    // ==========================================
    // Career Paths Configuration
    // ==========================================
    paths: {
        webdev: {
            id: 'webdev',
            name: 'Web Dev',
            fullName: 'Web Development',
            description: 'Master HTML, CSS, and JavaScript to build amazing websites',
            icon: '🌐',
            color: '#ff2a6d',
            totalLessons: 15,
            languages: ['HTML', 'CSS', 'JavaScript'],
            unlocked: true
        },
        fullstack: {
            id: 'fullstack',
            name: 'Full Stack',
            fullName: 'Full Stack Development',
            description: 'Become a complete developer with frontend and backend skills',
            icon: '🚀',
            color: '#05d9e8',
            totalLessons: 20,
            languages: ['Node.js', 'Express', 'React', 'Databases'],
            unlocked: false,
            requires: { webdev: 10 }
        },
        gamedev: {
            id: 'gamedev',
            name: 'Game Dev',
            fullName: 'Game Development',
            description: 'Create interactive games with Python and JavaScript',
            icon: '🎮',
            color: '#39ff14',
            totalLessons: 15,
            languages: ['Python', 'Pygame', 'JavaScript Canvas'],
            unlocked: false,
            requires: { webdev: 5 }
        },
        datascience: {
            id: 'datascience',
            name: 'Data Science',
            fullName: 'Data Science & Analytics',
            description: 'Analyze data and create visualizations with Python',
            icon: '📊',
            color: '#ffcd00',
            totalLessons: 15,
            languages: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
            unlocked: false,
            requires: { webdev: 3 }
        },
        mobile: {
            id: 'mobile',
            name: 'Mobile Dev',
            fullName: 'Mobile App Development',
            description: 'Build iOS and Android apps with React Native',
            icon: '📱',
            color: '#d264b6',
            totalLessons: 12,
            languages: ['React Native', 'Flutter'],
            unlocked: false,
            requires: { webdev: 10, fullstack: 5 }
        },
        devops: {
            id: 'devops',
            name: 'DevOps',
            fullName: 'DevOps & Cloud',
            description: 'Master deployment, containers, and cloud infrastructure',
            icon: '☁️',
            color: '#00d4ff',
            totalLessons: 12,
            languages: ['Git', 'Docker', 'CI/CD', 'AWS'],
            unlocked: false,
            requires: { fullstack: 10 }
        },
        aiml: {
            id: 'aiml',
            name: 'AI/ML',
            fullName: 'Artificial Intelligence & Machine Learning',
            description: 'Build intelligent systems with machine learning',
            icon: '🤖',
            color: '#ff6b35',
            totalLessons: 15,
            languages: ['Python', 'TensorFlow', 'Neural Networks'],
            unlocked: false,
            requires: { datascience: 10 }
        },
        cybersecurity: {
            id: 'cybersecurity',
            name: 'Security',
            fullName: 'Cybersecurity',
            description: 'Learn ethical hacking and security fundamentals',
            icon: '🔒',
            color: '#ff2a6d',
            totalLessons: 12,
            languages: ['Security Basics', 'Ethical Hacking', 'Cryptography'],
            unlocked: false,
            requires: { webdev: 10, devops: 5 }
        }
    },

    // ==========================================
    // Web Dev Lessons
    // ==========================================
    webdev: [
        {
            id: 1,
            title: 'Hello, Hacker',
            subtitle: 'Your First HTML Page',
            story: 'Welcome to the Grid, recruit. Every coder starts here. Your mission: create your first HTML page and send a message to the network.',
            concept: `
                <h3>What is HTML?</h3>
                <p>HTML (HyperText Markup Language) is the skeleton of every webpage. It tells the browser what content to display.</p>
                <h3>Basic Structure</h3>
                <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
            `,
            challenge: 'Create an HTML page with an h1 heading that says "Hello Grid" and a paragraph that says "I am a coder"',
            starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <!-- Write your code here -->

</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello Grid</h1>
    <p>I am a coder</p>
</body>
</html>`,
            tests: [
                { name: 'Has h1 tag', check: (code) => code.includes('<h1>') && code.includes('</h1>') },
                { name: 'H1 contains "Hello Grid"', check: (code) => code.toLowerCase().includes('hello grid') },
                { name: 'Has p tag', check: (code) => code.includes('<p>') && code.includes('</p>') },
                { name: 'P contains "I am a coder"', check: (code) => code.toLowerCase().includes('i am a coder') }
            ],
            xp: 50,
            language: 'html',
            hints: [
                'h1 tags are for main headings',
                'p tags are for paragraphs',
                'Make sure to close your tags with </h1> and </p>'
            ]
        },
        {
            id: 2,
            title: 'Style Protocol',
            subtitle: 'Introduction to CSS',
            story: 'The Grid looks boring in plain white. Time to upgrade with some neon style. CSS is your weapon of choice.',
            concept: `
                <h3>What is CSS?</h3>
                <p>CSS (Cascading Style Sheets) controls how HTML elements look - colors, fonts, sizes, and more.</p>

                <h3>Where Does CSS Go?</h3>
                <p>CSS goes inside a <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code> section:</p>
                <pre><code>&lt;head&gt;
    &lt;style&gt;
        /* CSS goes here */
    &lt;/style&gt;
&lt;/head&gt;</code></pre>

                <h3>Basic Syntax</h3>
                <p>CSS uses selectors to target HTML elements, then sets properties:</p>
                <pre><code>selector {
    property: value;
}</code></pre>

                <h3>Common Properties</h3>
                <p><strong>color</strong> - changes text color</p>
                <p><strong>background-color</strong> - changes background color</p>
                <pre><code>h1 {
    color: #ff2a6d;
}

body {
    background-color: #1a1a2e;
}</code></pre>

                <h3>Colors You'll Need</h3>
                <p>Neon Cyan: <code>#05d9e8</code></p>
                <p>Dark Purple: <code>#1a1a2e</code></p>
            `,
            challenge: 'Add a style tag in the head section. Make the h1 text color cyan (#05d9e8) and the body background color dark (#1a1a2e)',
            starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Neon Style</title>
    <!-- Add your style tag here -->

</head>
<body>
    <h1>Welcome to the Neon Grid</h1>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Neon Style</title>
    <style>
        body {
            background-color: #1a1a2e;
        }
        h1 {
            color: #05d9e8;
        }
    </style>
</head>
<body>
    <h1>Welcome to the Neon Grid</h1>
</body>
</html>`,
            tests: [
                { name: 'Has style tag', check: (code) => code.includes('<style>') && code.includes('</style>') },
                { name: 'H1 has cyan color', check: (code) => code.includes('#05d9e8') || code.includes('05d9e8') },
                { name: 'Body has dark background', check: (code) => code.includes('#1a1a2e') || code.includes('1a1a2e') }
            ],
            xp: 75,
            language: 'html',
            hints: [
                'Style tags go inside the head section',
                'Use body { } to style the whole page background',
                'Use h1 { } to style headings'
            ]
        },
        {
            id: 3,
            title: 'The DOM Awakens',
            subtitle: 'JavaScript Basics',
            story: 'Static pages are old news. With JavaScript, you can make things happen. Click a button, change the world.',
            concept: `
                <h3>What is JavaScript?</h3>
                <p>JavaScript makes web pages interactive. It can respond to clicks, change content, and much more.</p>
                <h3>Changing Content</h3>
                <pre><code>// Get an element by ID
let element = document.getElementById('myId');

// Change its text
element.textContent = 'New text!';

// Add click event
button.onclick = function() {
    // Do something
};</code></pre>
            `,
            challenge: 'Make the button change the h1 text to "Activated!" when clicked',
            starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Interactive</title>
</head>
<body>
    <h1 id="title">Click the button</h1>
    <button id="btn">Activate</button>

    <script>
        let button = document.getElementById('btn');
        let title = document.getElementById('title');

        // Add your click event here

    </script>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>Interactive</title>
</head>
<body>
    <h1 id="title">Click the button</h1>
    <button id="btn">Activate</button>

    <script>
        let button = document.getElementById('btn');
        let title = document.getElementById('title');

        button.onclick = function() {
            title.textContent = 'Activated!';
        };
    </script>
</body>
</html>`,
            tests: [
                { name: 'Has onclick handler', check: (code) => code.includes('.onclick') || code.includes('addEventListener') },
                { name: 'Changes textContent', check: (code) => code.includes('textContent') || code.includes('innerText') || code.includes('innerHTML') },
                { name: 'Sets text to Activated', check: (code) => code.includes('Activated') }
            ],
            xp: 100,
            language: 'html',
            hints: [
                'Use button.onclick = function() { } to handle clicks',
                'Use title.textContent = "text" to change the text',
                'Make sure to put "Activated!" in quotes'
            ]
        },
        {
            id: 4,
            title: 'Flexbox Matrix',
            subtitle: 'CSS Layout with Flexbox',
            story: 'The Grid needs structure. Flexbox gives you the power to arrange elements in any direction.',
            concept: `
                <h3>Flexbox Basics</h3>
                <p>Flexbox is a CSS layout mode that makes it easy to align and distribute elements.</p>
                <pre><code>.container {
    display: flex;
    justify-content: center;  /* horizontal */
    align-items: center;      /* vertical */
    gap: 20px;                /* space between */
}</code></pre>
            `,
            challenge: 'Use flexbox to center the three boxes horizontally with 20px gap between them',
            starterCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            /* Add flexbox styles here */

        }
        .box {
            width: 100px;
            height: 100px;
            background: #ff2a6d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        .box {
            width: 100px;
            height: 100px;
            background: #ff2a6d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>`,
            tests: [
                { name: 'Uses display: flex', check: (code) => code.includes('display: flex') || code.includes('display:flex') },
                { name: 'Centers content', check: (code) => code.includes('justify-content: center') || code.includes('justify-content:center') },
                { name: 'Has gap', check: (code) => code.includes('gap:') || code.includes('gap :') }
            ],
            xp: 100,
            language: 'html',
            hints: [
                'First add display: flex to the container',
                'Use justify-content: center to center horizontally',
                'Use gap: 20px for spacing'
            ]
        },
        {
            id: 5,
            title: 'BOSS: Landing Page',
            subtitle: 'Put It All Together',
            story: '⚠️ BOSS BATTLE ⚠️ Time to prove yourself. Build a complete landing page with a header, hero section, and styled button.',
            concept: `
                <h3>Boss Challenge</h3>
                <p>Combine everything you've learned: HTML structure, CSS styling, and make it look professional!</p>
            `,
            challenge: 'Create a landing page with: 1) A nav with your name, 2) A hero section with h1 and p, 3) A styled neon button',
            starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Landing Page</title>
    <style>
        /* Add your styles here */

    </style>
</head>
<body>
    <!-- Build your landing page here -->

</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <title>My Landing Page</title>
    <style>
        body {
            margin: 0;
            background: #1a1a2e;
            color: white;
            font-family: sans-serif;
        }
        nav {
            padding: 20px;
            background: #16213e;
        }
        .hero {
            padding: 100px 20px;
            text-align: center;
        }
        h1 {
            color: #05d9e8;
            font-size: 48px;
        }
        button {
            background: #ff2a6d;
            color: white;
            padding: 15px 30px;
            border: none;
            font-size: 18px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <nav>My Name</nav>
    <div class="hero">
        <h1>Welcome to My Site</h1>
        <p>This is my awesome landing page</p>
        <button>Get Started</button>
    </div>
</body>
</html>`,
            tests: [
                { name: 'Has nav element', check: (code) => code.includes('<nav>') },
                { name: 'Has h1 heading', check: (code) => code.includes('<h1>') },
                { name: 'Has paragraph', check: (code) => code.includes('<p>') },
                { name: 'Has button', check: (code) => code.includes('<button>') },
                { name: 'Has CSS styles', check: (code) => code.includes('<style>') && code.length > 500 }
            ],
            xp: 250,
            language: 'html',
            isBoss: true,
            hints: [
                'Start with the basic HTML structure',
                'Add a nav element for the header',
                'Create a div with class "hero" for the main content',
                'Style everything with CSS - background colors, padding, text colors'
            ]
        },
        {
            id: 6,
            title: 'Array Arsenal',
            subtitle: 'JavaScript Arrays',
            story: 'Data comes in waves. Arrays let you store multiple values in one place - like a digital backpack.',
            concept: `
                <h3>What are Arrays?</h3>
                <p>Arrays store multiple values in a single variable.</p>
                <pre><code>let colors = ['red', 'blue', 'green'];
console.log(colors[0]); // 'red'
colors.push('yellow'); // Add item
colors.length; // 4</code></pre>
            `,
            challenge: 'Create an array called "skills" with 3 items: "HTML", "CSS", "JS". Then push "React" to it.',
            starterCode: `<script>
// Create your skills array here

// Push "React" to the array

console.log(skills);
</script>`,
            solution: `<script>
let skills = ['HTML', 'CSS', 'JS'];
skills.push('React');
console.log(skills);
</script>`,
            tests: [
                { name: 'Creates skills array', check: (code) => code.includes('skills') && code.includes('[') },
                { name: 'Has HTML, CSS, JS', check: (code) => code.includes('HTML') && code.includes('CSS') && code.includes('JS') },
                { name: 'Uses push for React', check: (code) => code.includes('.push') && code.includes('React') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Use let skills = [...] to create array', 'Use skills.push("React") to add']
        },
        {
            id: 7,
            title: 'Loop Protocol',
            subtitle: 'For Loops',
            story: 'Repetitive tasks? Let the machine do the work. Loops repeat code automatically.',
            concept: `
                <h3>For Loops</h3>
                <p>Loops repeat code a set number of times.</p>
                <pre><code>for (let i = 0; i < 5; i++) {
    console.log(i); // 0,1,2,3,4
}

// Loop through array
let arr = ['a', 'b', 'c'];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}</code></pre>
            `,
            challenge: 'Write a for loop that logs numbers 1 to 5 to the console.',
            starterCode: `<script>
// Write your for loop here

</script>`,
            solution: `<script>
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
</script>`,
            tests: [
                { name: 'Has for loop', check: (code) => code.includes('for') && code.includes('(') },
                { name: 'Uses console.log', check: (code) => code.includes('console.log') },
                { name: 'Loops to 5', check: (code) => code.includes('5') || code.includes('<= 5') || code.includes('< 6') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Start with for (let i = 1; ...)', 'Use i <= 5 as condition', 'Use i++ to increment']
        },
        {
            id: 8,
            title: 'Function Factory',
            subtitle: 'Creating Functions',
            story: 'Functions are reusable code blocks. Write once, use everywhere.',
            concept: `
                <h3>Functions</h3>
                <p>Functions are reusable blocks of code.</p>
                <pre><code>function greet(name) {
    return 'Hello, ' + name;
}

let message = greet('Hacker');
console.log(message); // Hello, Hacker</code></pre>
            `,
            challenge: 'Create a function called "double" that takes a number and returns it multiplied by 2.',
            starterCode: `<script>
// Create your double function here

console.log(double(5)); // Should output 10
</script>`,
            solution: `<script>
function double(num) {
    return num * 2;
}
console.log(double(5));
</script>`,
            tests: [
                { name: 'Defines function', check: (code) => code.includes('function double') },
                { name: 'Has parameter', check: (code) => code.includes('double(') && code.includes(')') },
                { name: 'Returns doubled value', check: (code) => code.includes('return') && code.includes('* 2') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Use function double(num) {...}', 'Return the result with return', 'Multiply with * 2']
        },
        {
            id: 9,
            title: 'Event Horizon',
            subtitle: 'Event Listeners',
            story: 'The Grid responds to user actions. Learn to listen for events and react.',
            concept: `
                <h3>Event Listeners</h3>
                <p>addEventListener lets you respond to user actions.</p>
                <pre><code>let btn = document.getElementById('myBtn');

btn.addEventListener('click', function() {
    alert('Clicked!');
});

// Other events: 'mouseover', 'keydown', 'submit'</code></pre>
            `,
            challenge: 'Add a click event listener to the button that changes the div background to cyan (#05d9e8).',
            starterCode: `<!DOCTYPE html>
<body>
    <button id="colorBtn">Change Color</button>
    <div id="box" style="width:200px;height:200px;background:#333;"></div>
    <script>
        let btn = document.getElementById('colorBtn');
        let box = document.getElementById('box');

        // Add your event listener here

    </script>
</body>`,
            solution: `<!DOCTYPE html>
<body>
    <button id="colorBtn">Change Color</button>
    <div id="box" style="width:200px;height:200px;background:#333;"></div>
    <script>
        let btn = document.getElementById('colorBtn');
        let box = document.getElementById('box');

        btn.addEventListener('click', function() {
            box.style.background = '#05d9e8';
        });
    </script>
</body>`,
            tests: [
                { name: 'Uses addEventListener', check: (code) => code.includes('addEventListener') },
                { name: 'Listens for click', check: (code) => code.includes("'click'") || code.includes('"click"') },
                { name: 'Changes background', check: (code) => code.includes('style.background') && code.includes('05d9e8') }
            ],
            xp: 125,
            language: 'html',
            hints: ['Use btn.addEventListener("click", function() {...})', 'Change box.style.background']
        },
        {
            id: 10,
            title: 'BOSS: Counter App',
            subtitle: 'Combine Your Skills',
            story: '⚠️ BOSS BATTLE ⚠️ Build a counter with + and - buttons that updates a display.',
            concept: `<h3>Boss Challenge</h3><p>Combine variables, functions, events, and DOM manipulation!</p>`,
            challenge: 'Create a counter with +/- buttons. Display starts at 0. Plus adds 1, minus subtracts 1.',
            starterCode: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; color: #05d9e8; text-align: center; padding: 50px; font-family: sans-serif; }
        button { padding: 10px 20px; margin: 10px; font-size: 20px; cursor: pointer; }
        #count { font-size: 60px; margin: 20px; }
    </style>
</head>
<body>
    <div id="count">0</div>
    <button id="minus">-</button>
    <button id="plus">+</button>
    <script>
        let count = 0;
        // Add your code here

    </script>
</body>`,
            solution: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; color: #05d9e8; text-align: center; padding: 50px; font-family: sans-serif; }
        button { padding: 10px 20px; margin: 10px; font-size: 20px; cursor: pointer; }
        #count { font-size: 60px; margin: 20px; }
    </style>
</head>
<body>
    <div id="count">0</div>
    <button id="minus">-</button>
    <button id="plus">+</button>
    <script>
        let count = 0;
        let display = document.getElementById('count');

        document.getElementById('plus').addEventListener('click', function() {
            count++;
            display.textContent = count;
        });

        document.getElementById('minus').addEventListener('click', function() {
            count--;
            display.textContent = count;
        });
    </script>
</body>`,
            tests: [
                { name: 'Has plus button logic', check: (code) => code.includes('plus') && code.includes('addEventListener') },
                { name: 'Has minus button logic', check: (code) => code.includes('minus') },
                { name: 'Updates display', check: (code) => code.includes('textContent') || code.includes('innerHTML') },
                { name: 'Increments/decrements', check: (code) => (code.includes('++') || code.includes('+= 1') || code.includes('+ 1')) }
            ],
            xp: 300,
            language: 'html',
            isBoss: true,
            hints: ['Get both buttons with getElementById', 'Add click listeners to both', 'Update count and display.textContent']
        },
        {
            id: 11,
            title: 'Form Transmitter',
            subtitle: 'HTML Forms',
            story: 'Data entry portals. Forms collect user input and transmit it for processing.',
            concept: `
                <h3>HTML Forms</h3>
                <pre><code>&lt;form id="myForm"&gt;
    &lt;input type="text" id="name" placeholder="Name"&gt;
    &lt;input type="email" id="email" placeholder="Email"&gt;
    &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page refresh
    let name = document.getElementById('name').value;
    console.log(name);
});
&lt;/script&gt;</code></pre>
            `,
            challenge: 'Create a form with a text input for username. On submit, display the username in the output div.',
            starterCode: `<!DOCTYPE html>
<body>
    <form id="userForm">
        <!-- Add input here -->
        <button type="submit">Submit</button>
    </form>
    <div id="output"></div>
    <script>
        // Handle form submit

    </script>
</body>`,
            solution: `<!DOCTYPE html>
<body>
    <form id="userForm">
        <input type="text" id="username" placeholder="Username">
        <button type="submit">Submit</button>
    </form>
    <div id="output"></div>
    <script>
        document.getElementById('userForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let name = document.getElementById('username').value;
            document.getElementById('output').textContent = 'Hello, ' + name;
        });
    </script>
</body>`,
            tests: [
                { name: 'Has input field', check: (code) => code.includes('<input') && code.includes('type="text"') },
                { name: 'Prevents default', check: (code) => code.includes('preventDefault') },
                { name: 'Gets input value', check: (code) => code.includes('.value') },
                { name: 'Updates output', check: (code) => code.includes('output') && code.includes('textContent') }
            ],
            xp: 125,
            language: 'html',
            hints: ['Add an input with id="username"', 'Use e.preventDefault() to stop refresh', 'Get value with .value']
        },
        {
            id: 12,
            title: 'Animation Matrix',
            subtitle: 'CSS Animations',
            story: 'Static is boring. CSS animations bring elements to life with movement.',
            concept: `
                <h3>CSS Animations</h3>
                <pre><code>@keyframes glow {
    0% { box-shadow: 0 0 5px #05d9e8; }
    100% { box-shadow: 0 0 20px #05d9e8; }
}

.box {
    animation: glow 1s infinite alternate;
}

/* Transitions for hover */
.btn {
    transition: transform 0.3s;
}
.btn:hover {
    transform: scale(1.1);
}</code></pre>
            `,
            challenge: 'Create a CSS animation called "pulse" that scales an element from 1 to 1.2 and back. Apply it to the box.',
            starterCode: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; }
        /* Add your keyframes here */

        .box {
            width: 100px;
            height: 100px;
            background: #ff2a6d;
            /* Add animation here */
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>`,
            solution: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        .box {
            width: 100px;
            height: 100px;
            background: #ff2a6d;
            animation: pulse 1s infinite;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>`,
            tests: [
                { name: 'Has @keyframes', check: (code) => code.includes('@keyframes pulse') },
                { name: 'Uses scale transform', check: (code) => code.includes('scale(1.2)') || code.includes('scale(1.1)') },
                { name: 'Applies animation', check: (code) => code.includes('animation:') && code.includes('pulse') }
            ],
            xp: 125,
            language: 'html',
            hints: ['Define @keyframes pulse {...}', 'Use transform: scale()', 'Apply with animation: pulse 1s infinite']
        },
        {
            id: 13,
            title: 'Responsive Grid',
            subtitle: 'Media Queries',
            story: 'The Grid adapts. Media queries let your design respond to different screen sizes.',
            concept: `
                <h3>Media Queries</h3>
                <pre><code>/* Desktop styles (default) */
.container {
    display: flex;
    gap: 20px;
}

/* Mobile styles */
@media (max-width: 600px) {
    .container {
        flex-direction: column;
    }
}</code></pre>
            `,
            challenge: 'Make the boxes stack vertically on screens smaller than 500px using a media query.',
            starterCode: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; padding: 20px; }
        .container {
            display: flex;
            gap: 20px;
        }
        .box {
            width: 150px;
            height: 150px;
            background: #05d9e8;
        }
        /* Add your media query here */

    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>`,
            solution: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; padding: 20px; }
        .container {
            display: flex;
            gap: 20px;
        }
        .box {
            width: 150px;
            height: 150px;
            background: #05d9e8;
        }
        @media (max-width: 500px) {
            .container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>`,
            tests: [
                { name: 'Has media query', check: (code) => code.includes('@media') },
                { name: 'Uses max-width 500px', check: (code) => code.includes('500px') || code.includes('max-width') },
                { name: 'Changes to column', check: (code) => code.includes('flex-direction') && code.includes('column') }
            ],
            xp: 125,
            language: 'html',
            hints: ['Use @media (max-width: 500px) {...}', 'Inside, set flex-direction: column']
        },
        {
            id: 14,
            title: 'Local Memory',
            subtitle: 'LocalStorage',
            story: 'Persistent memory. LocalStorage saves data even after the browser closes.',
            concept: `
                <h3>LocalStorage</h3>
                <pre><code>// Save data
localStorage.setItem('username', 'Hacker');

// Get data
let name = localStorage.getItem('username');

// Remove data
localStorage.removeItem('username');

// Store objects (must stringify)
let user = { name: 'Neo', level: 5 };
localStorage.setItem('user', JSON.stringify(user));
let loaded = JSON.parse(localStorage.getItem('user'));</code></pre>
            `,
            challenge: 'Save the input value to localStorage when Save is clicked. Load and display it when Load is clicked.',
            starterCode: `<!DOCTYPE html>
<body style="background:#1a1a2e;color:white;padding:20px;">
    <input type="text" id="nameInput" placeholder="Enter name">
    <button id="saveBtn">Save</button>
    <button id="loadBtn">Load</button>
    <div id="result"></div>
    <script>
        // Add your code here

    </script>
</body>`,
            solution: `<!DOCTYPE html>
<body style="background:#1a1a2e;color:white;padding:20px;">
    <input type="text" id="nameInput" placeholder="Enter name">
    <button id="saveBtn">Save</button>
    <button id="loadBtn">Load</button>
    <div id="result"></div>
    <script>
        document.getElementById('saveBtn').addEventListener('click', function() {
            let name = document.getElementById('nameInput').value;
            localStorage.setItem('savedName', name);
            document.getElementById('result').textContent = 'Saved!';
        });

        document.getElementById('loadBtn').addEventListener('click', function() {
            let name = localStorage.getItem('savedName');
            document.getElementById('result').textContent = 'Loaded: ' + name;
        });
    </script>
</body>`,
            tests: [
                { name: 'Uses setItem', check: (code) => code.includes('localStorage.setItem') },
                { name: 'Uses getItem', check: (code) => code.includes('localStorage.getItem') },
                { name: 'Has click events', check: (code) => code.includes('addEventListener') && code.includes('click') }
            ],
            xp: 150,
            language: 'html',
            hints: ['Use localStorage.setItem(key, value) to save', 'Use localStorage.getItem(key) to load']
        },
        {
            id: 15,
            title: 'BOSS: Todo App',
            subtitle: 'Final Challenge',
            story: '⚠️ FINAL BOSS ⚠️ Build a complete Todo app with add, display, and localStorage persistence!',
            concept: `<h3>Ultimate Challenge</h3><p>Combine everything: HTML forms, JavaScript arrays, DOM manipulation, events, and localStorage!</p>`,
            challenge: 'Create a todo app: Input + Add button, list of todos, saves to localStorage. Todos should persist on refresh.',
            starterCode: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; color: #05d9e8; padding: 20px; font-family: sans-serif; }
        input { padding: 10px; margin-right: 10px; }
        button { padding: 10px 20px; background: #ff2a6d; color: white; border: none; cursor: pointer; }
        ul { list-style: none; padding: 0; margin-top: 20px; }
        li { padding: 10px; background: #16213e; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>My Todos</h1>
    <input type="text" id="todoInput" placeholder="Add todo...">
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>
    <script>
        let todos = [];
        // Your code here

    </script>
</body>`,
            solution: `<!DOCTYPE html>
<head>
    <style>
        body { background: #1a1a2e; color: #05d9e8; padding: 20px; font-family: sans-serif; }
        input { padding: 10px; margin-right: 10px; }
        button { padding: 10px 20px; background: #ff2a6d; color: white; border: none; cursor: pointer; }
        ul { list-style: none; padding: 0; margin-top: 20px; }
        li { padding: 10px; background: #16213e; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>My Todos</h1>
    <input type="text" id="todoInput" placeholder="Add todo...">
    <button id="addBtn">Add</button>
    <ul id="todoList"></ul>
    <script>
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function render() {
            let list = document.getElementById('todoList');
            list.innerHTML = todos.map(t => '<li>' + t + '</li>').join('');
        }

        document.getElementById('addBtn').addEventListener('click', function() {
            let input = document.getElementById('todoInput');
            if (input.value) {
                todos.push(input.value);
                localStorage.setItem('todos', JSON.stringify(todos));
                input.value = '';
                render();
            }
        });

        render();
    </script>
</body>`,
            tests: [
                { name: 'Adds todos to array', check: (code) => code.includes('push') },
                { name: 'Saves to localStorage', check: (code) => code.includes('localStorage.setItem') },
                { name: 'Loads from localStorage', check: (code) => code.includes('localStorage.getItem') },
                { name: 'Renders list', check: (code) => code.includes('innerHTML') || code.includes('appendChild') },
                { name: 'Has add event', check: (code) => code.includes('addEventListener') }
            ],
            xp: 500,
            language: 'html',
            isBoss: true,
            hints: ['Load todos with JSON.parse(localStorage.getItem("todos")) || []', 'Push new todo and save with JSON.stringify', 'Render by mapping todos to li elements']
        }
    ],

    // ==========================================
    // Full Stack Lessons
    // ==========================================
    fullstack: [
        {
            id: 1,
            title: 'Node.js Awakening',
            subtitle: 'Server-Side JavaScript',
            story: 'The backend awaits. Node.js lets you run JavaScript outside the browser - on servers.',
            concept: `
                <h3>What is Node.js?</h3>
                <p>Node.js runs JavaScript on servers. Create files, handle requests, access databases.</p>
                <pre><code>// Simple Node.js script
console.log('Hello from Node!');

// Node can read files
const fs = require('fs');
fs.readFileSync('file.txt', 'utf8');</code></pre>
            `,
            challenge: 'Write a Node.js script that logs "Server starting..." and then "Ready on port 3000"',
            starterCode: `// Node.js script
// Log the startup messages

`,
            solution: `console.log('Server starting...');
console.log('Ready on port 3000');`,
            tests: [
                { name: 'Logs starting message', check: (code) => code.includes('Server starting') },
                { name: 'Logs port message', check: (code) => code.includes('3000') && code.includes('console.log') }
            ],
            xp: 75,
            language: 'javascript',
            hints: ['Use console.log() for each message']
        },
        {
            id: 2,
            title: 'Package Protocol',
            subtitle: 'NPM Basics',
            story: 'NPM is the package manager. Millions of pre-built tools at your fingertips.',
            concept: `
                <h3>NPM Commands</h3>
                <pre><code>npm init          // Create package.json
npm install express  // Install package
npm install      // Install all from package.json

// In code:
const express = require('express');</code></pre>
            `,
            challenge: 'Write the require statement to import express, and create an app instance.',
            starterCode: `// Import express

// Create app instance

`,
            solution: `const express = require('express');
const app = express();`,
            tests: [
                { name: 'Requires express', check: (code) => code.includes("require('express')") || code.includes('require("express")') },
                { name: 'Creates app', check: (code) => code.includes('express()') }
            ],
            xp: 75,
            language: 'javascript',
            hints: ['Use const express = require("express")', 'Call express() to create app']
        },
        {
            id: 3,
            title: 'Express Launch',
            subtitle: 'Your First Server',
            story: 'Express makes building servers easy. Create endpoints, handle requests, send responses.',
            concept: `
                <h3>Express Server</h3>
                <pre><code>const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server running!');
});</code></pre>
            `,
            challenge: 'Create an Express server that responds with "Welcome to the API" on the root route.',
            starterCode: `const express = require('express');
const app = express();

// Add your route here

app.listen(3000);`,
            solution: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(3000);`,
            tests: [
                { name: 'Has GET route', check: (code) => code.includes("app.get('/'") || code.includes('app.get("/') },
                { name: 'Sends response', check: (code) => code.includes('res.send') },
                { name: 'Has welcome message', check: (code) => code.includes('Welcome') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Use app.get("/", (req, res) => {...})', 'Use res.send() to respond']
        },
        {
            id: 4,
            title: 'Route Mapping',
            subtitle: 'Multiple Routes',
            story: 'APIs have many endpoints. Each route handles different data.',
            concept: `
                <h3>Multiple Routes</h3>
                <pre><code>app.get('/users', (req, res) => {
    res.json([{name: 'Neo'}]);
});

app.get('/users/:id', (req, res) => {
    res.send('User ' + req.params.id);
});</code></pre>
            `,
            challenge: 'Add two routes: /api returns "API v1.0" and /status returns "OK"',
            starterCode: `const express = require('express');
const app = express();

// Add /api route

// Add /status route

app.listen(3000);`,
            solution: `const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.send('API v1.0');
});

app.get('/status', (req, res) => {
    res.send('OK');
});

app.listen(3000);`,
            tests: [
                { name: 'Has /api route', check: (code) => code.includes('/api') },
                { name: 'Has /status route', check: (code) => code.includes('/status') },
                { name: 'Returns correct responses', check: (code) => code.includes('API v1.0') && code.includes('OK') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Create two app.get() calls', 'One for /api, one for /status']
        },
        {
            id: 5,
            title: 'BOSS: REST Endpoint',
            subtitle: 'Build a Real Endpoint',
            story: '⚠️ BOSS BATTLE ⚠️ Create a /users endpoint that returns JSON array of users.',
            concept: `<h3>JSON Responses</h3><pre><code>res.json({ data: 'value' });</code></pre>`,
            challenge: 'Create GET /users that returns JSON: [{id: 1, name: "Neo"}, {id: 2, name: "Trinity"}]',
            starterCode: `const express = require('express');
const app = express();

// Create /users endpoint

app.listen(3000);`,
            solution: `const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.json([
        {id: 1, name: 'Neo'},
        {id: 2, name: 'Trinity'}
    ]);
});

app.listen(3000);`,
            tests: [
                { name: 'Has /users route', check: (code) => code.includes('/users') },
                { name: 'Returns JSON', check: (code) => code.includes('res.json') },
                { name: 'Has user data', check: (code) => code.includes('Neo') && code.includes('Trinity') }
            ],
            xp: 250,
            language: 'javascript',
            isBoss: true,
            hints: ['Use app.get("/users", ...)', 'Use res.json() for JSON response', 'Return an array of objects']
        },
        {
            id: 6,
            title: 'POST Protocol',
            subtitle: 'Handling POST Requests',
            story: 'GET reads data. POST creates it. Handle incoming data from clients.',
            concept: `
                <h3>POST Requests</h3>
                <pre><code>app.use(express.json()); // Parse JSON

app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser.name);
    res.status(201).json(newUser);
});</code></pre>
            `,
            challenge: 'Create a POST /messages endpoint that receives {text: "..."} and returns it with a success message.',
            starterCode: `const express = require('express');
const app = express();
app.use(express.json());

// Add POST /messages endpoint

app.listen(3000);`,
            solution: `const express = require('express');
const app = express();
app.use(express.json());

app.post('/messages', (req, res) => {
    res.json({ success: true, message: req.body.text });
});

app.listen(3000);`,
            tests: [
                { name: 'Has POST route', check: (code) => code.includes('app.post') },
                { name: 'Has /messages path', check: (code) => code.includes('/messages') },
                { name: 'Uses req.body', check: (code) => code.includes('req.body') }
            ],
            xp: 125,
            language: 'javascript',
            hints: ['Use app.post() for POST requests', 'Access data with req.body']
        },
        {
            id: 7,
            title: 'Middleware Matrix',
            subtitle: 'Express Middleware',
            story: 'Middleware runs between request and response. Log, authenticate, validate.',
            concept: `
                <h3>Middleware</h3>
                <pre><code>// Logger middleware
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next(); // Continue to next
});

// Route-specific middleware
app.get('/admin', authMiddleware, (req, res) => {
    res.send('Admin only');
});</code></pre>
            `,
            challenge: 'Create a logger middleware that logs the request method and URL for every request.',
            starterCode: `const express = require('express');
const app = express();

// Add logger middleware

app.get('/', (req, res) => res.send('Home'));
app.listen(3000);`,
            solution: `const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/', (req, res) => res.send('Home'));
app.listen(3000);`,
            tests: [
                { name: 'Uses app.use', check: (code) => code.includes('app.use(') },
                { name: 'Logs method', check: (code) => code.includes('req.method') },
                { name: 'Calls next()', check: (code) => code.includes('next()') }
            ],
            xp: 125,
            language: 'javascript',
            hints: ['Use app.use() with a function', 'Always call next() to continue']
        },
        {
            id: 8,
            title: 'React Foundation',
            subtitle: 'React Components',
            story: 'React builds UIs with components. Reusable, composable pieces.',
            concept: `
                <h3>React Components</h3>
                <pre><code>function Welcome() {
    return &lt;h1&gt;Hello, React!&lt;/h1&gt;;
}

function App() {
    return (
        &lt;div&gt;
            &lt;Welcome /&gt;
            &lt;Welcome /&gt;
        &lt;/div&gt;
    );
}</code></pre>
            `,
            challenge: 'Create a Card component that returns a div with className "card" containing an h2 with "Title" and a p with "Description".',
            starterCode: `// Create Card component

function App() {
    return (
        <div>
            <Card />
        </div>
    );
}`,
            solution: `function Card() {
    return (
        <div className="card">
            <h2>Title</h2>
            <p>Description</p>
        </div>
    );
}

function App() {
    return (
        <div>
            <Card />
        </div>
    );
}`,
            tests: [
                { name: 'Defines Card function', check: (code) => code.includes('function Card') },
                { name: 'Has className card', check: (code) => code.includes('className="card"') || code.includes("className='card'") },
                { name: 'Has h2 and p', check: (code) => code.includes('<h2>') && code.includes('<p>') }
            ],
            xp: 125,
            language: 'javascript',
            hints: ['function Card() { return ... }', 'Use className instead of class in React']
        },
        {
            id: 9,
            title: 'Props Pipeline',
            subtitle: 'Passing Data to Components',
            story: 'Props let you pass data to components. Dynamic and reusable!',
            concept: `
                <h3>Props</h3>
                <pre><code>function Greeting(props) {
    return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

// Or with destructuring
function Greeting({ name, age }) {
    return &lt;h1&gt;{name} is {age}&lt;/h1&gt;;
}

&lt;Greeting name="Neo" age={30} /&gt;</code></pre>
            `,
            challenge: 'Create a UserCard component that takes name and role props and displays them.',
            starterCode: `function UserCard(props) {
    // Return a div with name and role

}

function App() {
    return <UserCard name="Neo" role="Developer" />;
}`,
            solution: `function UserCard(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <p>{props.role}</p>
        </div>
    );
}

function App() {
    return <UserCard name="Neo" role="Developer" />;
}`,
            tests: [
                { name: 'Uses props.name', check: (code) => code.includes('props.name') || code.includes('{ name') },
                { name: 'Uses props.role', check: (code) => code.includes('props.role') || code.includes('role }') },
                { name: 'Displays in JSX', check: (code) => code.includes('{') && code.includes('}') }
            ],
            xp: 125,
            language: 'javascript',
            hints: ['Access props with props.name', 'Use {} to embed JavaScript in JSX']
        },
        {
            id: 10,
            title: 'BOSS: React App',
            subtitle: 'Interactive React',
            story: '⚠️ BOSS BATTLE ⚠️ Build a React app with state that toggles between light and dark mode.',
            concept: `<h3>useState Hook</h3><pre><code>const [value, setValue] = useState(initial);</code></pre>`,
            challenge: 'Create a theme toggle: button switches between "Light Mode" and "Dark Mode" text.',
            starterCode: `import { useState } from 'react';

function ThemeToggle() {
    // Add state for dark mode

    return (
        <div>
            {/* Display current mode and toggle button */}

        </div>
    );
}`,
            solution: `import { useState } from 'react';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    return (
        <div>
            <h1>{isDark ? 'Dark Mode' : 'Light Mode'}</h1>
            <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
        </div>
    );
}`,
            tests: [
                { name: 'Uses useState', check: (code) => code.includes('useState') },
                { name: 'Has toggle logic', check: (code) => code.includes('!') || code.includes('?') },
                { name: 'Has onClick handler', check: (code) => code.includes('onClick') }
            ],
            xp: 300,
            language: 'javascript',
            isBoss: true,
            hints: ['Use useState(false) for isDark', 'Toggle with setIsDark(!isDark)', 'Use ternary: isDark ? "Dark" : "Light"']
        },
        {
            id: 11,
            title: 'Database Basics',
            subtitle: 'MongoDB Introduction',
            story: 'Data needs a home. MongoDB stores JSON-like documents.',
            concept: `
                <h3>MongoDB with Mongoose</h3>
                <pre><code>const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');

const User = mongoose.model('User', {
    name: String,
    email: String
});

// Create
const user = new User({ name: 'Neo' });
await user.save();</code></pre>
            `,
            challenge: 'Define a Product model with name (String), price (Number), and inStock (Boolean) fields.',
            starterCode: `const mongoose = require('mongoose');

// Define Product model

`,
            solution: `const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    inStock: Boolean
});`,
            tests: [
                { name: 'Uses mongoose.model', check: (code) => code.includes('mongoose.model') },
                { name: 'Has name field', check: (code) => code.includes('name') && code.includes('String') },
                { name: 'Has price field', check: (code) => code.includes('price') && code.includes('Number') },
                { name: 'Has inStock field', check: (code) => code.includes('inStock') && code.includes('Boolean') }
            ],
            xp: 150,
            language: 'javascript',
            hints: ['mongoose.model("Name", { fields })', 'Use String, Number, Boolean types']
        },
        {
            id: 12,
            title: 'CRUD Operations',
            subtitle: 'Create Read Update Delete',
            story: 'Four operations rule databases: Create, Read, Update, Delete.',
            concept: `
                <h3>CRUD with Mongoose</h3>
                <pre><code>// Create
await User.create({ name: 'Neo' });

// Read
const users = await User.find();
const one = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { name: 'New' });

// Delete
await User.findByIdAndDelete(id);</code></pre>
            `,
            challenge: 'Write an async function that creates a user, finds all users, and returns them.',
            starterCode: `async function manageUsers() {
    // Create a user with name "Test"

    // Find all users

    // Return the users

}`,
            solution: `async function manageUsers() {
    await User.create({ name: 'Test' });
    const users = await User.find();
    return users;
}`,
            tests: [
                { name: 'Is async function', check: (code) => code.includes('async') },
                { name: 'Creates user', check: (code) => code.includes('.create') || code.includes('new User') },
                { name: 'Finds users', check: (code) => code.includes('.find()') },
                { name: 'Returns result', check: (code) => code.includes('return') }
            ],
            xp: 150,
            language: 'javascript',
            hints: ['Use await with async operations', 'User.create({...}) to create', 'User.find() to get all']
        },
        {
            id: 13,
            title: 'API Integration',
            subtitle: 'Fetch in React',
            story: 'Connect frontend to backend. Fetch data from your API!',
            concept: `
                <h3>useEffect + Fetch</h3>
                <pre><code>import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return users.map(u => &lt;p&gt;{u.name}&lt;/p&gt;);
}</code></pre>
            `,
            challenge: 'Create a component that fetches and displays a list of posts from /api/posts.',
            starterCode: `import { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);

    // Add useEffect to fetch posts

    return (
        <div>
            {/* Display posts */}
        </div>
    );
}`,
            solution: `import { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div>
            {posts.map(post => <p key={post.id}>{post.title}</p>)}
        </div>
    );
}`,
            tests: [
                { name: 'Uses useEffect', check: (code) => code.includes('useEffect') },
                { name: 'Fetches from API', check: (code) => code.includes('fetch') && code.includes('/api/posts') },
                { name: 'Updates state', check: (code) => code.includes('setPosts') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['useEffect(() => {...}, []) runs once', 'Chain .then() for promises', 'Call setPosts with fetched data']
        },
        {
            id: 14,
            title: 'Forms in React',
            subtitle: 'Controlled Components',
            story: 'React forms use controlled components - state controls input values.',
            concept: `
                <h3>Controlled Inputs</h3>
                <pre><code>function Form() {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', name);
    };

    return (
        &lt;form onSubmit={handleSubmit}&gt;
            &lt;input value={name} onChange={e =&gt; setName(e.target.value)} /&gt;
            &lt;button type="submit"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
    );
}</code></pre>
            `,
            challenge: 'Create a login form with email and password inputs that logs the values on submit.',
            starterCode: `import { useState } from 'react';

function LoginForm() {
    // Add state for email and password

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log email and password
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add inputs */}
            <button type="submit">Login</button>
        </form>
    );
}`,
            solution: `import { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}`,
            tests: [
                { name: 'Has email state', check: (code) => code.includes('email') && code.includes('setEmail') },
                { name: 'Has password state', check: (code) => code.includes('password') && code.includes('setPassword') },
                { name: 'Has onSubmit', check: (code) => code.includes('onSubmit') },
                { name: 'Prevents default', check: (code) => code.includes('preventDefault') }
            ],
            xp: 150,
            language: 'javascript',
            hints: ['Create useState for each input', 'Use value={state} and onChange={...}', 'Call e.preventDefault() in submit']
        },
        {
            id: 15,
            title: 'BOSS: Full CRUD',
            subtitle: 'Complete CRUD App',
            story: '⚠️ BOSS BATTLE ⚠️ Build a full CRUD API with Express and MongoDB routes.',
            concept: `<h3>RESTful Routes</h3><pre><code>GET /items - List all
POST /items - Create
PUT /items/:id - Update
DELETE /items/:id - Delete</code></pre>`,
            challenge: 'Create all 4 CRUD routes for /tasks: list, create, update, delete.',
            starterCode: `const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

// GET all tasks

// POST new task

// PUT update task

// DELETE task

app.listen(3000);`,
            solution: `const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = { id: Date.now(), ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.map(t => t.id === id ? {...t, ...req.body} : t);
    res.json({ success: true });
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({ success: true });
});

app.listen(3000);`,
            tests: [
                { name: 'Has GET route', check: (code) => code.includes("app.get('/tasks'") || code.includes('app.get("/tasks"') },
                { name: 'Has POST route', check: (code) => code.includes("app.post('/tasks'") || code.includes('app.post("/tasks"') },
                { name: 'Has PUT route', check: (code) => code.includes('app.put') && code.includes(':id') },
                { name: 'Has DELETE route', check: (code) => code.includes('app.delete') && code.includes(':id') }
            ],
            xp: 400,
            language: 'javascript',
            isBoss: true,
            hints: ['GET returns all tasks', 'POST adds to array with req.body', 'PUT/DELETE use req.params.id']
        },
        {
            id: 16,
            title: 'JWT Auth',
            subtitle: 'Authentication Tokens',
            story: 'Secure your API. JWT tokens verify user identity.',
            concept: `
                <h3>JSON Web Tokens</h3>
                <pre><code>const jwt = require('jsonwebtoken');

// Create token
const token = jwt.sign({ userId: 1 }, 'secret', { expiresIn: '1h' });

// Verify token
const decoded = jwt.verify(token, 'secret');
console.log(decoded.userId); // 1</code></pre>
            `,
            challenge: 'Create a login route that returns a JWT token with the user id.',
            starterCode: `const jwt = require('jsonwebtoken');
const SECRET = 'mysecret';

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // If valid credentials (assume they are)
    // Create and return token

});`,
            solution: `const jwt = require('jsonwebtoken');
const SECRET = 'mysecret';

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // If valid credentials
    const token = jwt.sign({ userId: 1, username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});`,
            tests: [
                { name: 'Uses jwt.sign', check: (code) => code.includes('jwt.sign') },
                { name: 'Includes userId', check: (code) => code.includes('userId') },
                { name: 'Returns token', check: (code) => code.includes('res.json') && code.includes('token') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['jwt.sign(payload, secret, options)', 'Return the token in response JSON']
        },
        {
            id: 17,
            title: 'Protected Routes',
            subtitle: 'Auth Middleware',
            story: 'Guard your routes. Only authenticated users get access.',
            concept: `
                <h3>Auth Middleware</h3>
                <pre><code>function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

app.get('/protected', auth, (req, res) => {
    res.json({ user: req.user });
});</code></pre>
            `,
            challenge: 'Create an auth middleware that checks for a valid JWT token.',
            starterCode: `const jwt = require('jsonwebtoken');
const SECRET = 'mysecret';

function auth(req, res, next) {
    // Get token from Authorization header
    // Verify it and call next() or return 401

}`,
            solution: `const jwt = require('jsonwebtoken');
const SECRET = 'mysecret';

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token' });
    }
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}`,
            tests: [
                { name: 'Gets token from header', check: (code) => code.includes('authorization') || code.includes('Authorization') },
                { name: 'Uses jwt.verify', check: (code) => code.includes('jwt.verify') },
                { name: 'Calls next()', check: (code) => code.includes('next()') },
                { name: 'Returns 401 on error', check: (code) => code.includes('401') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['Extract token from req.headers.authorization', 'Use try/catch for jwt.verify', 'Attach decoded to req.user']
        },
        {
            id: 18,
            title: 'React Router',
            subtitle: 'Client-Side Routing',
            story: 'Single-page apps need routing. Navigate without page reloads.',
            concept: `
                <h3>React Router</h3>
                <pre><code>import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        &lt;BrowserRouter&gt;
            &lt;nav&gt;
                &lt;Link to="/"&gt;Home&lt;/Link&gt;
                &lt;Link to="/about"&gt;About&lt;/Link&gt;
            &lt;/nav&gt;
            &lt;Routes&gt;
                &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
                &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
            &lt;/Routes&gt;
        &lt;/BrowserRouter&gt;
    );
}</code></pre>
            `,
            challenge: 'Set up React Router with Home, About, and Contact pages.',
            starterCode: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { return <h1>Home</h1>; }
function About() { return <h1>About</h1>; }
function Contact() { return <h1>Contact</h1>; }

function App() {
    return (
        // Add BrowserRouter, navigation Links, and Routes

    );
}`,
            solution: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { return <h1>Home</h1>; }
function About() { return <h1>About</h1>; }
function Contact() { return <h1>Contact</h1>; }

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}`,
            tests: [
                { name: 'Uses BrowserRouter', check: (code) => code.includes('<BrowserRouter>') },
                { name: 'Has Links', check: (code) => code.includes('<Link') && code.includes('to=') },
                { name: 'Has Routes', check: (code) => code.includes('<Routes>') },
                { name: 'Defines 3 routes', check: (code) => (code.match(/<Route/g) || []).length >= 3 }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['Wrap everything in BrowserRouter', 'Use Link for navigation', 'Route path="..." element={<Component />}']
        },
        {
            id: 19,
            title: 'Environment Config',
            subtitle: 'dotenv & Config',
            story: 'Never hardcode secrets. Environment variables keep them safe.',
            concept: `
                <h3>Environment Variables</h3>
                <pre><code>// .env file
DB_URL=mongodb://localhost/mydb
JWT_SECRET=mysupersecret
PORT=3000

// server.js
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;</code></pre>
            `,
            challenge: 'Use dotenv to load DB_URL and PORT from environment variables.',
            starterCode: `// Load dotenv

// Get config from environment variables

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Connect to DB using environment variable

// Listen on PORT from environment (default 3000)
`,
            solution: `require('dotenv').config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(DB_URL);

app.listen(PORT, () => console.log('Server running on', PORT));`,
            tests: [
                { name: 'Loads dotenv', check: (code) => code.includes('dotenv') && code.includes('config') },
                { name: 'Uses process.env', check: (code) => code.includes('process.env') },
                { name: 'Has DB_URL', check: (code) => code.includes('DB_URL') },
                { name: 'Has PORT with default', check: (code) => code.includes('PORT') && code.includes('||') }
            ],
            xp: 125,
            language: 'javascript',
            hints: ['require("dotenv").config() at top', 'process.env.VARIABLE_NAME', 'Use || for default values']
        },
        {
            id: 20,
            title: 'BOSS: Full Stack App',
            subtitle: 'Complete Application',
            story: '⚠️ FINAL BOSS ⚠️ Connect all the pieces: React frontend + Express API + MongoDB!',
            concept: `<h3>Full Stack Architecture</h3><p>Frontend calls API, API talks to database. You control it all!</p>`,
            challenge: 'Create an Express server with a /api/notes endpoint that React can fetch from. Include CORS.',
            starterCode: `const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let notes = [
    { id: 1, text: 'Learn Full Stack' },
    { id: 2, text: 'Build Projects' }
];

// Add GET /api/notes

// Add POST /api/notes

app.listen(5000, () => console.log('API running on 5000'));`,
            solution: `const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let notes = [
    { id: 1, text: 'Learn Full Stack' },
    { id: 2, text: 'Build Projects' }
];

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = { id: Date.now(), text: req.body.text };
    notes.push(note);
    res.status(201).json(note);
});

app.listen(5000, () => console.log('API running on 5000'));`,
            tests: [
                { name: 'Uses CORS', check: (code) => code.includes('cors()') },
                { name: 'Has GET /api/notes', check: (code) => code.includes('/api/notes') && code.includes('app.get') },
                { name: 'Has POST /api/notes', check: (code) => code.includes('/api/notes') && code.includes('app.post') },
                { name: 'Returns JSON', check: (code) => code.includes('res.json') }
            ],
            xp: 500,
            language: 'javascript',
            isBoss: true,
            hints: ['Enable CORS with app.use(cors())', 'GET returns the notes array', 'POST adds new note with req.body']
        }
    ],

    // ==========================================
    // Game Dev Lessons
    // ==========================================
    gamedev: [
        {
            id: 1,
            title: 'Python Portal',
            subtitle: 'Python Basics',
            story: 'Game dev starts with Python fundamentals. Master the basics first.',
            concept: `
                <h3>Python Basics</h3>
                <pre><code># Variables
player_name = "Hero"
health = 100
is_alive = True

# Print
print("Welcome, " + player_name)
print(f"Health: {health}")</code></pre>
            `,
            challenge: 'Create variables: player_name = "Gamer", score = 0, game_over = False. Print the player name.',
            starterCode: `# Create your variables here

# Print the player name
`,
            solution: `player_name = "Gamer"
score = 0
game_over = False
print(player_name)`,
            tests: [
                { name: 'Has player_name', check: (code) => code.includes('player_name') && code.includes('Gamer') },
                { name: 'Has score = 0', check: (code) => code.includes('score') && code.includes('0') },
                { name: 'Has game_over', check: (code) => code.includes('game_over') && code.includes('False') },
                { name: 'Prints name', check: (code) => code.includes('print') }
            ],
            xp: 75,
            language: 'python',
            hints: ['Python uses = for assignment', 'Booleans are True/False (capital)']
        },
        {
            id: 2,
            title: 'Canvas Quest',
            subtitle: 'HTML5 Canvas',
            story: 'The browser has a canvas for drawing. Perfect for 2D games!',
            concept: `
                <h3>Canvas Basics</h3>
                <pre><code>&lt;canvas id="game" width="400" height="300"&gt;&lt;/canvas&gt;
&lt;script&gt;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = '#ff2a6d';
ctx.fillRect(10, 10, 50, 50);
&lt;/script&gt;</code></pre>
            `,
            challenge: 'Draw a cyan (#05d9e8) square at position (100, 100) that is 80x80 pixels.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Draw your square here

</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#05d9e8';
ctx.fillRect(100, 100, 80, 80);
</script>`,
            tests: [
                { name: 'Sets fill color', check: (code) => code.includes('fillStyle') && code.includes('05d9e8') },
                { name: 'Draws rectangle', check: (code) => code.includes('fillRect') },
                { name: 'Correct position', check: (code) => code.includes('100') && code.includes('80') }
            ],
            xp: 100,
            language: 'html',
            hints: ['Set ctx.fillStyle first', 'Use ctx.fillRect(x, y, width, height)']
        },
        {
            id: 3,
            title: 'Game Loop',
            subtitle: 'Animation Frame',
            story: 'Games run in loops - update, draw, repeat. 60 times per second!',
            concept: `
                <h3>The Game Loop</h3>
                <pre><code>let x = 0;

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update position
    x += 2;

    // Draw
    ctx.fillRect(x, 100, 50, 50);

    // Next frame
    requestAnimationFrame(gameLoop);
}

gameLoop(); // Start!</code></pre>
            `,
            challenge: 'Create a game loop that moves a square from left to right across the canvas.',
            starterCode: `<canvas id="game" width="400" height="200" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let x = 0;

function gameLoop() {
    // Clear, update x, draw square, request next frame

}

gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="200" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let x = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += 2;
    ctx.fillStyle = '#ff2a6d';
    ctx.fillRect(x, 75, 50, 50);
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>`,
            tests: [
                { name: 'Clears canvas', check: (code) => code.includes('clearRect') },
                { name: 'Updates x', check: (code) => code.includes('x +=') || code.includes('x = x +') },
                { name: 'Uses requestAnimationFrame', check: (code) => code.includes('requestAnimationFrame') }
            ],
            xp: 125,
            language: 'html',
            hints: ['Clear with clearRect(0, 0, width, height)', 'Increment x each frame', 'Call requestAnimationFrame(gameLoop)']
        },
        {
            id: 4,
            title: 'Keyboard Control',
            subtitle: 'Player Input',
            story: 'Players need control! Capture keyboard input to move your character.',
            concept: `
                <h3>Keyboard Events</h3>
                <pre><code>let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// In game loop:
if (keys['ArrowRight']) x += 5;
if (keys['ArrowLeft']) x -= 5;</code></pre>
            `,
            challenge: 'Add keyboard controls to move a square with arrow keys.',
            starterCode: `<canvas id="game" width="400" height="200" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let x = 175, y = 75;
let keys = {};

// Add keydown and keyup listeners

function gameLoop() {
    ctx.clearRect(0, 0, 400, 200);

    // Check keys and move x/y

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(x, y, 50, 50);
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="200" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let x = 175, y = 75;
let keys = {};

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function gameLoop() {
    ctx.clearRect(0, 0, 400, 200);

    if (keys['ArrowRight']) x += 5;
    if (keys['ArrowLeft']) x -= 5;
    if (keys['ArrowUp']) y -= 5;
    if (keys['ArrowDown']) y += 5;

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(x, y, 50, 50);
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>`,
            tests: [
                { name: 'Has keydown listener', check: (code) => code.includes('keydown') },
                { name: 'Has keyup listener', check: (code) => code.includes('keyup') },
                { name: 'Checks arrow keys', check: (code) => code.includes('ArrowRight') || code.includes('ArrowLeft') }
            ],
            xp: 150,
            language: 'html',
            hints: ['Store key states in keys object', 'Check keys in the game loop']
        },
        {
            id: 5,
            title: 'BOSS: Catch Game',
            subtitle: 'Your First Game',
            story: '⚠️ BOSS BATTLE ⚠️ Build a simple game: move a paddle to catch falling objects!',
            concept: `<h3>Combine Everything</h3><p>Game loop + keyboard + collision = a real game!</p>`,
            challenge: 'Create a game with a paddle that moves left/right. A ball falls from top. Catch it!',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let paddleX = 160;
let ballX = 200, ballY = 0;
let keys = {};

// Add keyboard listeners

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    // Move paddle with keys

    // Move ball down

    // Draw paddle (bottom)
    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(paddleX, 270, 80, 20);

    // Draw ball
    ctx.fillStyle = '#ff2a6d';
    ctx.fillRect(ballX, ballY, 20, 20);

    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let paddleX = 160;
let ballX = 200, ballY = 0;
let keys = {};

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    if (keys['ArrowLeft'] && paddleX > 0) paddleX -= 8;
    if (keys['ArrowRight'] && paddleX < 320) paddleX += 8;

    ballY += 3;
    if (ballY > 300) {
        ballY = 0;
        ballX = Math.random() * 380;
    }

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(paddleX, 270, 80, 20);

    ctx.fillStyle = '#ff2a6d';
    ctx.fillRect(ballX, ballY, 20, 20);

    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>`,
            tests: [
                { name: 'Has keyboard controls', check: (code) => code.includes('keydown') && code.includes('ArrowLeft') },
                { name: 'Ball moves down', check: (code) => code.includes('ballY') && (code.includes('+=') || code.includes('+ ')) },
                { name: 'Ball resets', check: (code) => code.includes('ballY = 0') || code.includes('ballY=0') },
                { name: 'Paddle moves', check: (code) => code.includes('paddleX') && code.includes('+=') }
            ],
            xp: 350,
            language: 'html',
            isBoss: true,
            hints: ['Move paddle with arrow keys', 'Increment ballY each frame', 'Reset ball when it goes off screen']
        },
        {
            id: 6,
            title: 'Collision Detection',
            subtitle: 'When Objects Meet',
            story: 'Games need collisions. Detect when objects touch!',
            concept: `
                <h3>Box Collision</h3>
                <pre><code>function collides(a, b) {
    return a.x < b.x + b.w &&
           a.x + a.w > b.x &&
           a.y < b.y + b.h &&
           a.y + a.h > b.y;
}

// Usage
if (collides(player, enemy)) {
    console.log('Hit!');
}</code></pre>
            `,
            challenge: 'Add collision detection between the player square and the target. Change color on collision.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');

let player = { x: 50, y: 130, w: 40, h: 40 };
let target = { x: 300, y: 130, w: 40, h: 40 };
let keys = {};
let hit = false;

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function collides(a, b) {
    // Add collision logic
}

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    if (keys['ArrowRight']) player.x += 5;
    if (keys['ArrowLeft']) player.x -= 5;

    // Check collision

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = hit ? '#39ff14' : '#ff2a6d';
    ctx.fillRect(target.x, target.y, target.w, target.h);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');

let player = { x: 50, y: 130, w: 40, h: 40 };
let target = { x: 300, y: 130, w: 40, h: 40 };
let keys = {};
let hit = false;

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function collides(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    if (keys['ArrowRight']) player.x += 5;
    if (keys['ArrowLeft']) player.x -= 5;

    hit = collides(player, target);

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = hit ? '#39ff14' : '#ff2a6d';
    ctx.fillRect(target.x, target.y, target.w, target.h);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has collision function', check: (code) => code.includes('function collides') },
                { name: 'Checks boundaries', check: (code) => code.includes('.x') && code.includes('.w') },
                { name: 'Updates hit variable', check: (code) => code.includes('hit =') && code.includes('collides') }
            ],
            xp: 150,
            language: 'html',
            hints: ['Compare all 4 sides', 'Return true if all conditions met', 'Call collides(player, target)']
        },
        {
            id: 7,
            title: 'Score System',
            subtitle: 'Track Points',
            story: 'Every game needs a score. Track player progress!',
            concept: `
                <h3>Scoring</h3>
                <pre><code>let score = 0;

// On collision/action
score += 10;

// Display
ctx.fillStyle = 'white';
ctx.font = '20px Arial';
ctx.fillText('Score: ' + score, 10, 30);</code></pre>
            `,
            challenge: 'Add a score that increases when catching falling objects. Display it on canvas.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let paddleX = 160;
let ballX = Math.random() * 380, ballY = 0;
let score = 0;
let keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    if (keys['ArrowLeft']) paddleX -= 8;
    if (keys['ArrowRight']) paddleX += 8;

    ballY += 4;

    // Check if ball hit paddle (ballY > 260 && ballX > paddleX && ballX < paddleX + 80)
    // If yes, add score and reset ball

    // If ball missed (ballY > 300), just reset

    // Draw score at top

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(paddleX, 270, 80, 20);
    ctx.fillStyle = '#ff2a6d';
    ctx.fillRect(ballX, ballY, 20, 20);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let paddleX = 160;
let ballX = Math.random() * 380, ballY = 0;
let score = 0;
let keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    if (keys['ArrowLeft']) paddleX -= 8;
    if (keys['ArrowRight']) paddleX += 8;

    ballY += 4;

    if (ballY > 260 && ballX > paddleX && ballX < paddleX + 80) {
        score += 10;
        ballY = 0;
        ballX = Math.random() * 380;
    }

    if (ballY > 300) {
        ballY = 0;
        ballX = Math.random() * 380;
    }

    ctx.fillStyle = '#ffcd00';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(paddleX, 270, 80, 20);
    ctx.fillStyle = '#ff2a6d';
    ctx.fillRect(ballX, ballY, 20, 20);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has score variable', check: (code) => code.includes('let score') || code.includes('var score') },
                { name: 'Increases score', check: (code) => code.includes('score +=') || code.includes('score = score +') },
                { name: 'Displays score', check: (code) => code.includes('fillText') && code.includes('score') }
            ],
            xp: 150,
            language: 'html',
            hints: ['Check if ballY > 260 and ballX is over paddle', 'Use ctx.fillText to draw score', 'Reset ball position on catch']
        },
        {
            id: 8,
            title: 'Game States',
            subtitle: 'Start, Play, End',
            story: 'Games have phases: menu, playing, game over. Manage them!',
            concept: `
                <h3>State Machine</h3>
                <pre><code>let state = 'menu'; // 'menu', 'playing', 'gameover'

function gameLoop() {
    if (state === 'menu') {
        drawMenu();
    } else if (state === 'playing') {
        updateGame();
        drawGame();
    } else if (state === 'gameover') {
        drawGameOver();
    }
}</code></pre>
            `,
            challenge: 'Add game states: "start" shows "Press SPACE to play", "playing" runs the game, "gameover" shows final score.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let state = 'start';
let score = 0;
let lives = 3;

document.addEventListener('keydown', e => {
    if (e.key === ' ' && state === 'start') {
        state = 'playing';
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    // Handle different states

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let state = 'start';
let score = 0;
let lives = 3;

document.addEventListener('keydown', e => {
    if (e.key === ' ' && state === 'start') {
        state = 'playing';
        score = 0;
        lives = 3;
    }
    if (e.key === ' ' && state === 'gameover') {
        state = 'start';
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);
    ctx.fillStyle = '#05d9e8';
    ctx.font = '24px Arial';

    if (state === 'start') {
        ctx.fillText('Press SPACE to play', 100, 150);
    } else if (state === 'playing') {
        ctx.fillText('Playing! Score: ' + score, 100, 150);
        // Game logic would go here
    } else if (state === 'gameover') {
        ctx.fillText('Game Over! Score: ' + score, 80, 150);
        ctx.fillText('Press SPACE to restart', 80, 180);
    }

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has state variable', check: (code) => code.includes("state") && (code.includes("'start'") || code.includes('"start"')) },
                { name: 'Checks state conditions', check: (code) => code.includes("if") && code.includes("state ===") },
                { name: 'Has gameover state', check: (code) => code.includes('gameover') }
            ],
            xp: 175,
            language: 'html',
            hints: ['Use if/else if for each state', 'Change state on key press', 'Draw different content per state']
        },
        {
            id: 9,
            title: 'Sprite Animation',
            subtitle: 'Animated Characters',
            story: 'Static squares are boring. Animate your sprites!',
            concept: `
                <h3>Frame Animation</h3>
                <pre><code>let frame = 0;
let frameCount = 4;

function animate() {
    frame = (frame + 1) % frameCount;

    // Draw different frame
    // Or cycle through colors/shapes
}

// Call every few frames
if (tick % 10 === 0) animate();</code></pre>
            `,
            challenge: 'Create a simple animation that cycles through 4 colors every 15 frames.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
const colors = ['#ff2a6d', '#05d9e8', '#ffcd00', '#39ff14'];
let frame = 0;
let tick = 0;

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);
    tick++;

    // Every 15 ticks, advance to next frame/color

    // Draw square with current color
    ctx.fillStyle = colors[frame];
    ctx.fillRect(175, 125, 50, 50);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
const colors = ['#ff2a6d', '#05d9e8', '#ffcd00', '#39ff14'];
let frame = 0;
let tick = 0;

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);
    tick++;

    if (tick % 15 === 0) {
        frame = (frame + 1) % colors.length;
    }

    ctx.fillStyle = colors[frame];
    ctx.fillRect(175, 125, 50, 50);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has frame counter', check: (code) => code.includes('frame') },
                { name: 'Uses modulo', check: (code) => code.includes('%') },
                { name: 'Changes frame periodically', check: (code) => code.includes('tick %') || code.includes('frame =') }
            ],
            xp: 150,
            language: 'html',
            hints: ['Use tick % 15 === 0 to check interval', 'Use modulo to wrap: (frame + 1) % length']
        },
        {
            id: 10,
            title: 'BOSS: Shooter Game',
            subtitle: 'Complete Mini Game',
            story: '⚠️ BOSS BATTLE ⚠️ Build a space shooter: player shoots bullets at enemies!',
            concept: `<h3>Game Systems</h3><p>Combine: movement, bullets array, enemies, collision, scoring!</p>`,
            challenge: 'Create a shooter: player moves left/right, SPACE fires bullets up, hit enemies for points.',
            starterCode: `<canvas id="game" width="400" height="400" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let player = { x: 185, y: 360, w: 30, h: 30 };
let bullets = [];
let enemies = [{ x: 50, y: 50, w: 30, h: 30 }, { x: 150, y: 50, w: 30, h: 30 }, { x: 250, y: 50, w: 30, h: 30 }];
let score = 0;
let keys = {};

document.addEventListener('keydown', e => {
    keys[e.key] = true;
    // Add bullet on SPACE
});
document.addEventListener('keyup', e => keys[e.key] = false);

function gameLoop() {
    ctx.clearRect(0, 0, 400, 400);

    // Move player

    // Move bullets up

    // Check bullet-enemy collisions

    // Draw everything

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="400" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let player = { x: 185, y: 360, w: 30, h: 30 };
let bullets = [];
let enemies = [{ x: 50, y: 50, w: 30, h: 30 }, { x: 150, y: 50, w: 30, h: 30 }, { x: 250, y: 50, w: 30, h: 30 }];
let score = 0;
let keys = {};

document.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ') {
        bullets.push({ x: player.x + 12, y: player.y, w: 6, h: 15 });
    }
});
document.addEventListener('keyup', e => keys[e.key] = false);

function collides(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function gameLoop() {
    ctx.clearRect(0, 0, 400, 400);

    if (keys['ArrowLeft'] && player.x > 0) player.x -= 6;
    if (keys['ArrowRight'] && player.x < 370) player.x += 6;

    bullets.forEach(b => b.y -= 8);
    bullets = bullets.filter(b => b.y > 0);

    bullets.forEach(bullet => {
        enemies.forEach((enemy, i) => {
            if (collides(bullet, enemy)) {
                enemies.splice(i, 1);
                score += 100;
            }
        });
    });

    ctx.fillStyle = '#ffcd00';
    ctx.font = '18px Arial';
    ctx.fillText('Score: ' + score, 10, 25);

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = '#ffcd00';
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

    ctx.fillStyle = '#ff2a6d';
    enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has bullets array', check: (code) => code.includes('bullets') && code.includes('[]') },
                { name: 'Fires on SPACE', check: (code) => code.includes("' '") && code.includes('push') },
                { name: 'Has collision detection', check: (code) => code.includes('collides') },
                { name: 'Updates score', check: (code) => code.includes('score +=') }
            ],
            xp: 400,
            language: 'html',
            isBoss: true,
            hints: ['Push new bullet to array on SPACE', 'Move bullets up each frame', 'Check collision between each bullet and enemy']
        },
        {
            id: 11,
            title: 'Sound Effects',
            subtitle: 'Audio in Games',
            story: 'Games need sound! Add audio feedback for actions.',
            concept: `
                <h3>Web Audio</h3>
                <pre><code>// Simple beep using Web Audio API
function playSound(freq = 440, duration = 0.1) {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.frequency.value = freq;
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), duration * 1000);
}

// Play on action
playSound(880, 0.1); // High beep
playSound(220, 0.2); // Low beep</code></pre>
            `,
            challenge: 'Add sound effects: high beep (880Hz) when scoring, low beep (220Hz) when missing.',
            starterCode: `<canvas id="game" width="400" height="200" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');

function playSound(freq, duration) {
    // Create oscillator and play sound
}

let score = 0;

document.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        score += 10;
        // Play high beep
    } else {
        // Play low beep
    }
});

function draw() {
    ctx.clearRect(0, 0, 400, 200);
    ctx.fillStyle = '#05d9e8';
    ctx.font = '24px Arial';
    ctx.fillText('Click! Score: ' + score, 100, 100);
    requestAnimationFrame(draw);
}
draw();
</script>`,
            solution: `<canvas id="game" width="400" height="200" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');

function playSound(freq, duration) {
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.connect(audioCtx.destination);
    osc.start();
    setTimeout(() => osc.stop(), duration * 1000);
}

let score = 0;

document.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        score += 10;
        playSound(880, 0.1);
    } else {
        playSound(220, 0.2);
    }
});

function draw() {
    ctx.clearRect(0, 0, 400, 200);
    ctx.fillStyle = '#05d9e8';
    ctx.font = '24px Arial';
    ctx.fillText('Click! Score: ' + score, 100, 100);
    requestAnimationFrame(draw);
}
draw();
</script>`,
            tests: [
                { name: 'Creates AudioContext', check: (code) => code.includes('AudioContext') },
                { name: 'Creates oscillator', check: (code) => code.includes('createOscillator') },
                { name: 'Calls playSound', check: (code) => code.includes('playSound(880') && code.includes('playSound(220') }
            ],
            xp: 175,
            language: 'html',
            hints: ['new AudioContext() creates audio', 'createOscillator() makes the sound', 'frequency.value sets the pitch']
        },
        {
            id: 12,
            title: 'Particle Effects',
            subtitle: 'Visual Polish',
            story: 'Particles add juice! Explosions, trails, sparkles.',
            concept: `
                <h3>Particle System</h3>
                <pre><code>let particles = [];

function emit(x, y) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 30
        });
    }
}

// In game loop
particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
});
particles = particles.filter(p => p.life > 0);</code></pre>
            `,
            challenge: 'Create a particle explosion on click that spawns 20 particles moving in random directions.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let particles = [];

function emit(x, y) {
    // Create 20 particles with random velocities
}

document.addEventListener('click', (e) => {
    const rect = document.getElementById('game').getBoundingClientRect();
    emit(e.clientX - rect.left, e.clientY - rect.top);
});

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    // Update and draw particles

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let particles = [];

function emit(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            life: 40
        });
    }
}

document.addEventListener('click', (e) => {
    const rect = document.getElementById('game').getBoundingClientRect();
    emit(e.clientX - rect.left, e.clientY - rect.top);
});

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = 'rgba(255, 42, 109, ' + (p.life / 40) + ')';
        ctx.fillRect(p.x, p.y, 5, 5);
    });
    particles = particles.filter(p => p.life > 0);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Creates particles array', check: (code) => code.includes('particles') },
                { name: 'Emits multiple particles', check: (code) => code.includes('for') && code.includes('push') },
                { name: 'Has velocity', check: (code) => code.includes('vx') && code.includes('vy') },
                { name: 'Filters dead particles', check: (code) => code.includes('filter') && code.includes('life') }
            ],
            xp: 175,
            language: 'html',
            hints: ['Loop to create 20 particles', 'Random velocity: (Math.random() - 0.5) * speed', 'Filter out particles with life <= 0']
        },
        {
            id: 13,
            title: 'High Scores',
            subtitle: 'Persistent Leaderboard',
            story: 'Track the best scores! Save to localStorage.',
            concept: `
                <h3>High Score System</h3>
                <pre><code>function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5); // Top 5
    localStorage.setItem('highScores', JSON.stringify(scores));
}

function getScores() {
    return JSON.parse(localStorage.getItem('highScores')) || [];
}</code></pre>
            `,
            challenge: 'Implement high score saving and display. Show top 5 scores on game over.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let score = Math.floor(Math.random() * 1000);

function saveScore(newScore) {
    // Get existing scores, add new, sort descending, keep top 5, save
}

function getScores() {
    // Return scores array from localStorage
}

// Simulate game over
saveScore(score);

function draw() {
    ctx.clearRect(0, 0, 400, 300);
    ctx.fillStyle = '#ffcd00';
    ctx.font = '20px Arial';
    ctx.fillText('Your Score: ' + score, 20, 40);
    ctx.fillText('High Scores:', 20, 80);

    // Display top scores
    const scores = getScores();

    requestAnimationFrame(draw);
}
draw();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const ctx = document.getElementById('game').getContext('2d');
let score = Math.floor(Math.random() * 1000);

function saveScore(newScore) {
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    scores.push(newScore);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem('highScores', JSON.stringify(scores));
}

function getScores() {
    return JSON.parse(localStorage.getItem('highScores')) || [];
}

saveScore(score);

function draw() {
    ctx.clearRect(0, 0, 400, 300);
    ctx.fillStyle = '#ffcd00';
    ctx.font = '20px Arial';
    ctx.fillText('Your Score: ' + score, 20, 40);
    ctx.fillText('High Scores:', 20, 80);

    const scores = getScores();
    scores.forEach((s, i) => {
        ctx.fillStyle = '#05d9e8';
        ctx.fillText((i + 1) + '. ' + s, 20, 110 + i * 30);
    });

    requestAnimationFrame(draw);
}
draw();
</script>`,
            tests: [
                { name: 'Uses localStorage.setItem', check: (code) => code.includes('localStorage.setItem') },
                { name: 'Uses localStorage.getItem', check: (code) => code.includes('localStorage.getItem') },
                { name: 'Sorts scores', check: (code) => code.includes('.sort') },
                { name: 'Limits to top scores', check: (code) => code.includes('.slice') }
            ],
            xp: 175,
            language: 'html',
            hints: ['JSON.parse to load, JSON.stringify to save', 'sort((a,b) => b - a) for descending', 'slice(0, 5) for top 5']
        },
        {
            id: 14,
            title: 'Mobile Touch',
            subtitle: 'Touch Controls',
            story: 'Mobile games need touch! Handle finger input.',
            concept: `
                <h3>Touch Events</h3>
                <pre><code>canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    handleInput(x, y);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    // Same pattern
});</code></pre>
            `,
            challenge: 'Add touch controls: tap left half to move left, tap right half to move right.',
            starterCode: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let playerX = 175;

// Add touch event listener

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(playerX, 250, 50, 30);

    ctx.fillStyle = '#ffcd00';
    ctx.font = '16px Arial';
    ctx.fillText('Tap left/right to move', 120, 30);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="300" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let playerX = 175;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;

    if (x < 200) {
        playerX -= 20;
    } else {
        playerX += 20;
    }
});

canvas.addEventListener('click', (e) => {
    const x = e.clientX - canvas.offsetLeft;
    if (x < 200) playerX -= 20;
    else playerX += 20;
});

function gameLoop() {
    ctx.clearRect(0, 0, 400, 300);

    ctx.fillStyle = '#05d9e8';
    ctx.fillRect(playerX, 250, 50, 30);

    ctx.fillStyle = '#ffcd00';
    ctx.font = '16px Arial';
    ctx.fillText('Tap left/right to move', 120, 30);

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has touchstart listener', check: (code) => code.includes('touchstart') },
                { name: 'Gets touch position', check: (code) => code.includes('touches[0]') || code.includes('clientX') },
                { name: 'Moves based on position', check: (code) => code.includes('playerX') && code.includes('<') }
            ],
            xp: 150,
            language: 'html',
            hints: ['e.touches[0] gets first touch', 'Compare x to canvas center (200)', 'Move left or right based on tap side']
        },
        {
            id: 15,
            title: 'BOSS: Complete Game',
            subtitle: 'Full Arcade Game',
            story: '⚠️ FINAL BOSS ⚠️ Build a complete arcade game with all systems: menu, gameplay, scoring, game over, high scores!',
            concept: `<h3>Full Game Architecture</h3><p>States + Input + Collision + Scoring + Persistence = Complete Game!</p>`,
            challenge: 'Create a complete dodge game: avoid falling enemies, collect coins, track lives and score, save high scores.',
            starterCode: `<canvas id="game" width="400" height="400" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let state = 'menu';
let player = { x: 175, y: 350, w: 50, h: 30 };
let enemies = [];
let coins = [];
let score = 0;
let lives = 3;
let keys = {};

document.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ' && state !== 'playing') {
        startGame();
    }
});
document.addEventListener('keyup', e => keys[e.key] = false);

function startGame() {
    // Reset game state
}

function spawnEnemy() {
    // Add enemy at random x, y = -30
}

function spawnCoin() {
    // Add coin at random x, y = -20
}

function collides(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function gameLoop() {
    ctx.clearRect(0, 0, 400, 400);

    // Implement game states and logic

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            solution: `<canvas id="game" width="400" height="400" style="background:#1a1a2e;"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let state = 'menu';
let player = { x: 175, y: 350, w: 50, h: 30 };
let enemies = [];
let coins = [];
let score = 0;
let lives = 3;
let keys = {};

document.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ' && state !== 'playing') startGame();
});
document.addEventListener('keyup', e => keys[e.key] = false);

function startGame() {
    state = 'playing';
    score = 0;
    lives = 3;
    enemies = [];
    coins = [];
    player.x = 175;
}

function spawnEnemy() {
    enemies.push({ x: Math.random() * 370, y: -30, w: 30, h: 30 });
}

function spawnCoin() {
    coins.push({ x: Math.random() * 380, y: -20, w: 20, h: 20 });
}

function collides(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function saveScore() {
    let scores = JSON.parse(localStorage.getItem('dodgeScores')) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem('dodgeScores', JSON.stringify(scores.slice(0, 5)));
}

let tick = 0;
function gameLoop() {
    ctx.clearRect(0, 0, 400, 400);
    tick++;

    if (state === 'menu') {
        ctx.fillStyle = '#ffcd00';
        ctx.font = '24px Arial';
        ctx.fillText('DODGE GAME', 130, 150);
        ctx.font = '16px Arial';
        ctx.fillText('Press SPACE to start', 130, 200);
    } else if (state === 'playing') {
        if (keys['ArrowLeft'] && player.x > 0) player.x -= 6;
        if (keys['ArrowRight'] && player.x < 350) player.x += 6;

        if (tick % 60 === 0) spawnEnemy();
        if (tick % 90 === 0) spawnCoin();

        enemies.forEach(e => e.y += 4);
        coins.forEach(c => c.y += 3);

        enemies = enemies.filter(e => {
            if (collides(player, e)) { lives--; return false; }
            return e.y < 400;
        });

        coins = coins.filter(c => {
            if (collides(player, c)) { score += 50; return false; }
            return c.y < 400;
        });

        if (lives <= 0) { state = 'gameover'; saveScore(); }

        ctx.fillStyle = '#05d9e8';
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.fillStyle = '#ff2a6d';
        enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));
        ctx.fillStyle = '#ffcd00';
        coins.forEach(c => ctx.fillRect(c.x, c.y, c.w, c.h));

        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('Score: ' + score + '  Lives: ' + lives, 10, 25);
    } else if (state === 'gameover') {
        ctx.fillStyle = '#ff2a6d';
        ctx.font = '28px Arial';
        ctx.fillText('GAME OVER', 130, 150);
        ctx.fillStyle = '#ffcd00';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 160, 200);
        ctx.font = '16px Arial';
        ctx.fillText('Press SPACE to restart', 120, 250);
    }

    requestAnimationFrame(gameLoop);
}
gameLoop();
</script>`,
            tests: [
                { name: 'Has game states', check: (code) => code.includes('menu') && code.includes('playing') && code.includes('gameover') },
                { name: 'Has collision detection', check: (code) => code.includes('collides') },
                { name: 'Tracks lives', check: (code) => code.includes('lives') && code.includes('--') },
                { name: 'Saves high scores', check: (code) => code.includes('localStorage') },
                { name: 'Spawns objects', check: (code) => code.includes('spawn') && code.includes('push') }
            ],
            xp: 500,
            language: 'html',
            isBoss: true,
            hints: ['Use state machine for menu/playing/gameover', 'Spawn enemies and coins periodically', 'Check collisions, update score/lives', 'Save to localStorage on game over']
        }
    ],

    // ==========================================
    // Data Science Lessons
    // ==========================================
    datascience: [
        {
            id: 1,
            title: 'Python Variables',
            subtitle: 'Data Containers',
            story: 'Data science starts with Python. Variables store your data.',
            concept: `
                <h3>Variables in Python</h3>
                <pre><code># Numbers
price = 29.99
quantity = 5

# Strings
product = "Widget"

# Calculations
total = price * quantity
print(total)  # 149.95</code></pre>
            `,
            challenge: 'Create variables for a sale: item = "Laptop", price = 999.99, tax_rate = 0.08. Calculate and print the total with tax.',
            starterCode: `# Create your variables

# Calculate total (price + price * tax_rate)

# Print the total
`,
            solution: `item = "Laptop"
price = 999.99
tax_rate = 0.08
total = price + price * tax_rate
print(total)`,
            tests: [
                { name: 'Has item variable', check: (code) => code.includes('item') && code.includes('Laptop') },
                { name: 'Has price', check: (code) => code.includes('999.99') },
                { name: 'Calculates with tax', check: (code) => code.includes('tax_rate') && code.includes('*') },
                { name: 'Prints result', check: (code) => code.includes('print') }
            ],
            xp: 75,
            language: 'python',
            hints: ['Use * for multiplication', 'Total = price + (price * tax_rate)']
        },
        {
            id: 2,
            title: 'List Power',
            subtitle: 'Python Lists',
            story: 'Lists store collections of data - essential for data science.',
            concept: `
                <h3>Python Lists</h3>
                <pre><code>sales = [100, 150, 200, 175]

# Access items
print(sales[0])  # 100

# List functions
len(sales)    # 4
sum(sales)    # 625
max(sales)    # 200
min(sales)    # 100

# Add items
sales.append(225)</code></pre>
            `,
            challenge: 'Create a list of temperatures: [72, 75, 68, 71, 73]. Print the average (sum/len).',
            starterCode: `# Create temperatures list

# Calculate and print average
`,
            solution: `temperatures = [72, 75, 68, 71, 73]
average = sum(temperatures) / len(temperatures)
print(average)`,
            tests: [
                { name: 'Has temperature list', check: (code) => code.includes('[') && code.includes('72') },
                { name: 'Uses sum()', check: (code) => code.includes('sum(') },
                { name: 'Uses len()', check: (code) => code.includes('len(') },
                { name: 'Calculates average', check: (code) => code.includes('/') }
            ],
            xp: 100,
            language: 'python',
            hints: ['Create list with [...]', 'Average = sum(list) / len(list)']
        },
        {
            id: 3,
            title: 'Dictionary Data',
            subtitle: 'Key-Value Storage',
            story: 'Dictionaries map keys to values - perfect for structured data.',
            concept: `
                <h3>Python Dictionaries</h3>
                <pre><code>user = {
    'name': 'Neo',
    'age': 30,
    'role': 'Developer'
}

print(user['name'])  # Neo
user['level'] = 5    # Add new key</code></pre>
            `,
            challenge: 'Create a product dictionary with name, price, and stock. Print the product name.',
            starterCode: `# Create product dictionary

# Print the product name
`,
            solution: `product = {
    'name': 'Keyboard',
    'price': 49.99,
    'stock': 100
}
print(product['name'])`,
            tests: [
                { name: 'Has dictionary', check: (code) => code.includes('{') && code.includes(':') },
                { name: 'Has name key', check: (code) => code.includes("'name'") || code.includes('"name"') },
                { name: 'Has price key', check: (code) => code.includes("'price'") || code.includes('"price"') },
                { name: 'Prints name', check: (code) => code.includes('print') }
            ],
            xp: 100,
            language: 'python',
            hints: ['Use {} for dictionary', 'Access with dict["key"]']
        },
        {
            id: 4,
            title: 'Data Loops',
            subtitle: 'Iterating Data',
            story: 'Loop through data to analyze and transform it.',
            concept: `
                <h3>Loops in Python</h3>
                <pre><code>sales = [100, 200, 150]

# Loop through list
for sale in sales:
    print(sale)

# With index
for i, sale in enumerate(sales):
    print(f"Day {i+1}: ${sale}")</code></pre>
            `,
            challenge: 'Loop through prices [10, 25, 30, 15] and print each price with 10% discount applied.',
            starterCode: `prices = [10, 25, 30, 15]

# Loop and print discounted prices
`,
            solution: `prices = [10, 25, 30, 15]

for price in prices:
    discounted = price * 0.9
    print(discounted)`,
            tests: [
                { name: 'Has for loop', check: (code) => code.includes('for') && code.includes('in') },
                { name: 'Calculates discount', check: (code) => code.includes('0.9') || code.includes('* .9') || code.includes('- ') },
                { name: 'Prints results', check: (code) => code.includes('print') }
            ],
            xp: 100,
            language: 'python',
            hints: ['Use for price in prices:', '10% discount = price * 0.9']
        },
        {
            id: 5,
            title: 'BOSS: Sales Analysis',
            subtitle: 'Analyze Real Data',
            story: '⚠️ BOSS BATTLE ⚠️ Analyze sales data: find total, average, best and worst day.',
            concept: `<h3>Combine Your Skills</h3><p>Use lists, loops, and built-in functions!</p>`,
            challenge: 'Given daily_sales = [120, 85, 200, 95, 310, 180, 155], find and print: total, average, max, and min.',
            starterCode: `daily_sales = [120, 85, 200, 95, 310, 180, 155]

# Calculate and print:
# Total sales
# Average
# Best day (max)
# Worst day (min)
`,
            solution: `daily_sales = [120, 85, 200, 95, 310, 180, 155]

total = sum(daily_sales)
average = total / len(daily_sales)
best = max(daily_sales)
worst = min(daily_sales)

print("Total:", total)
print("Average:", average)
print("Best:", best)
print("Worst:", worst)`,
            tests: [
                { name: 'Calculates total', check: (code) => code.includes('sum(') },
                { name: 'Finds average', check: (code) => code.includes('len(') && code.includes('/') },
                { name: 'Finds max', check: (code) => code.includes('max(') },
                { name: 'Finds min', check: (code) => code.includes('min(') },
                { name: 'Prints results', check: (code) => code.match(/print/g)?.length >= 2 }
            ],
            xp: 300,
            language: 'python',
            isBoss: true,
            hints: ['Use sum() for total', 'Average = sum/len', 'Use max() and min()']
        },
        {
            id: 6,
            title: 'File Operations',
            subtitle: 'Reading Data Files',
            story: 'Data lives in files. Learn to read and parse CSV data.',
            concept: `
                <h3>Reading Files</h3>
                <pre><code># Reading text file
with open('data.txt', 'r') as f:
    content = f.read()

# Reading CSV manually
with open('data.csv', 'r') as f:
    lines = f.readlines()
    for line in lines:
        values = line.strip().split(',')
        print(values)</code></pre>
            `,
            challenge: 'Parse this CSV data string and print each row as a list.',
            starterCode: `csv_data = """name,age,city
Alice,25,NYC
Bob,30,LA
Carol,28,Chicago"""

# Split into lines and parse each row

`,
            solution: `csv_data = """name,age,city
Alice,25,NYC
Bob,30,LA
Carol,28,Chicago"""

lines = csv_data.strip().split('\\n')
for line in lines:
    row = line.split(',')
    print(row)`,
            tests: [
                { name: 'Splits into lines', check: (code) => code.includes('.split') && (code.includes('\\n') || code.includes("'\\n'")) },
                { name: 'Loops through lines', check: (code) => code.includes('for') },
                { name: 'Splits by comma', check: (code) => code.includes("split(',')") || code.includes('split(",")') }
            ],
            xp: 125,
            language: 'python',
            hints: ['Split by newline first', 'Loop through lines', 'Split each line by comma']
        },
        {
            id: 7,
            title: 'Pandas Power',
            subtitle: 'DataFrames',
            story: 'Pandas is THE data library. DataFrames make data analysis easy!',
            concept: `
                <h3>Pandas Basics</h3>
                <pre><code>import pandas as pd

# Create DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob'],
    'age': [25, 30]
})

# Read CSV
df = pd.read_csv('data.csv')

# Basic operations
df.head()       # First 5 rows
df.shape        # (rows, columns)
df.columns      # Column names
df['age'].mean() # Average of column</code></pre>
            `,
            challenge: 'Create a DataFrame with columns: product, price, quantity. Add 3 products.',
            starterCode: `import pandas as pd

# Create DataFrame with product data

# Print the DataFrame
`,
            solution: `import pandas as pd

df = pd.DataFrame({
    'product': ['Laptop', 'Mouse', 'Keyboard'],
    'price': [999, 29, 79],
    'quantity': [10, 50, 30]
})

print(df)`,
            tests: [
                { name: 'Imports pandas', check: (code) => code.includes('import pandas') },
                { name: 'Creates DataFrame', check: (code) => code.includes('pd.DataFrame') || code.includes('DataFrame(') },
                { name: 'Has required columns', check: (code) => code.includes('product') && code.includes('price') && code.includes('quantity') }
            ],
            xp: 150,
            language: 'python',
            hints: ['import pandas as pd', 'pd.DataFrame({...})', 'Pass dict with lists as values']
        },
        {
            id: 8,
            title: 'Data Filtering',
            subtitle: 'Query Your Data',
            story: 'Filter data to find what you need. Pandas makes it simple.',
            concept: `
                <h3>Filtering DataFrames</h3>
                <pre><code># Filter rows
expensive = df[df['price'] > 100]

# Multiple conditions
young_nyc = df[(df['age'] < 30) & (df['city'] == 'NYC')]

# Select columns
names = df['name']
subset = df[['name', 'age']]</code></pre>
            `,
            challenge: 'Filter the DataFrame to show only products with price > 50 and quantity > 20.',
            starterCode: `import pandas as pd

df = pd.DataFrame({
    'product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],
    'price': [999, 29, 79, 299],
    'quantity': [10, 50, 30, 15]
})

# Filter: price > 50 AND quantity > 20

`,
            solution: `import pandas as pd

df = pd.DataFrame({
    'product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],
    'price': [999, 29, 79, 299],
    'quantity': [10, 50, 30, 15]
})

filtered = df[(df['price'] > 50) & (df['quantity'] > 20)]
print(filtered)`,
            tests: [
                { name: 'Filters by price', check: (code) => code.includes('price') && code.includes('> 50') },
                { name: 'Filters by quantity', check: (code) => code.includes('quantity') && code.includes('> 20') },
                { name: 'Uses & for AND', check: (code) => code.includes('&') }
            ],
            xp: 150,
            language: 'python',
            hints: ['Use df[condition]', 'Combine with & (and)', 'Wrap each condition in ()']
        },
        {
            id: 9,
            title: 'Aggregations',
            subtitle: 'GroupBy & Stats',
            story: 'Aggregate data to find patterns. GroupBy is your friend.',
            concept: `
                <h3>Grouping Data</h3>
                <pre><code># Group and aggregate
df.groupby('category')['sales'].sum()
df.groupby('region')['price'].mean()

# Multiple aggregations
df.groupby('city').agg({
    'sales': 'sum',
    'orders': 'count'
})</code></pre>
            `,
            challenge: 'Group sales by region and calculate total sales per region.',
            starterCode: `import pandas as pd

df = pd.DataFrame({
    'region': ['North', 'South', 'North', 'South', 'North'],
    'product': ['A', 'B', 'C', 'A', 'B'],
    'sales': [100, 150, 200, 120, 180]
})

# Group by region and sum sales

`,
            solution: `import pandas as pd

df = pd.DataFrame({
    'region': ['North', 'South', 'North', 'South', 'North'],
    'product': ['A', 'B', 'C', 'A', 'B'],
    'sales': [100, 150, 200, 120, 180]
})

result = df.groupby('region')['sales'].sum()
print(result)`,
            tests: [
                { name: 'Uses groupby', check: (code) => code.includes('.groupby(') },
                { name: 'Groups by region', check: (code) => code.includes("'region'") || code.includes('"region"') },
                { name: 'Sums sales', check: (code) => code.includes('.sum()') }
            ],
            xp: 150,
            language: 'python',
            hints: ['df.groupby("column")', 'Select column then aggregate', '.sum() for total']
        },
        {
            id: 10,
            title: 'BOSS: Data Pipeline',
            subtitle: 'Full Analysis',
            story: '⚠️ BOSS BATTLE ⚠️ Build a complete data pipeline: load, clean, filter, aggregate, report!',
            concept: `<h3>Data Pipeline</h3><p>Real analysis combines all steps!</p>`,
            challenge: 'Analyze the sales data: find total sales by category, filter categories with sales > 200, sort descending.',
            starterCode: `import pandas as pd

df = pd.DataFrame({
    'category': ['Electronics', 'Clothing', 'Electronics', 'Food', 'Clothing', 'Food'],
    'item': ['Phone', 'Shirt', 'Laptop', 'Pizza', 'Pants', 'Burger'],
    'sales': [500, 50, 1000, 20, 80, 15]
})

# 1. Group by category and sum sales
# 2. Filter categories with total > 200
# 3. Sort descending
# 4. Print result

`,
            solution: `import pandas as pd

df = pd.DataFrame({
    'category': ['Electronics', 'Clothing', 'Electronics', 'Food', 'Clothing', 'Food'],
    'item': ['Phone', 'Shirt', 'Laptop', 'Pizza', 'Pants', 'Burger'],
    'sales': [500, 50, 1000, 20, 80, 15]
})

totals = df.groupby('category')['sales'].sum()
filtered = totals[totals > 200]
sorted_data = filtered.sort_values(ascending=False)
print(sorted_data)`,
            tests: [
                { name: 'Groups by category', check: (code) => code.includes('groupby') && code.includes('category') },
                { name: 'Sums sales', check: (code) => code.includes('.sum()') },
                { name: 'Filters > 200', check: (code) => code.includes('> 200') },
                { name: 'Sorts data', check: (code) => code.includes('sort') }
            ],
            xp: 350,
            language: 'python',
            isBoss: true,
            hints: ['groupby + sum first', 'Filter with series[series > 200]', 'sort_values(ascending=False)']
        },
        {
            id: 11,
            title: 'Visualization Basics',
            subtitle: 'Matplotlib Intro',
            story: 'Pictures tell stories. Visualize your data with Matplotlib!',
            concept: `
                <h3>Matplotlib Basics</h3>
                <pre><code>import matplotlib.pyplot as plt

# Line plot
plt.plot([1, 2, 3], [10, 20, 15])
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('My Plot')
plt.show()

# From pandas
df['sales'].plot(kind='bar')
plt.show()</code></pre>
            `,
            challenge: 'Create a line plot of monthly sales: months [1,2,3,4,5], sales [100,150,130,180,200].',
            starterCode: `import matplotlib.pyplot as plt

months = [1, 2, 3, 4, 5]
sales = [100, 150, 130, 180, 200]

# Create line plot with labels and title

`,
            solution: `import matplotlib.pyplot as plt

months = [1, 2, 3, 4, 5]
sales = [100, 150, 130, 180, 200]

plt.plot(months, sales)
plt.xlabel('Month')
plt.ylabel('Sales')
plt.title('Monthly Sales')
plt.show()`,
            tests: [
                { name: 'Imports matplotlib', check: (code) => code.includes('import matplotlib') },
                { name: 'Creates plot', check: (code) => code.includes('plt.plot(') },
                { name: 'Has labels', check: (code) => code.includes('xlabel') || code.includes('ylabel') },
                { name: 'Has title', check: (code) => code.includes('title') }
            ],
            xp: 150,
            language: 'python',
            hints: ['plt.plot(x, y) for line', 'plt.xlabel(), plt.ylabel()', 'plt.title() and plt.show()']
        },
        {
            id: 12,
            title: 'Bar Charts',
            subtitle: 'Comparing Categories',
            story: 'Bar charts compare categories. Perfect for sales by region!',
            concept: `
                <h3>Bar Charts</h3>
                <pre><code>categories = ['A', 'B', 'C']
values = [25, 40, 30]

plt.bar(categories, values, color='cyan')
plt.xlabel('Category')
plt.ylabel('Value')
plt.title('Sales by Category')
plt.show()</code></pre>
            `,
            challenge: 'Create a bar chart showing sales by product: ["Laptop", "Phone", "Tablet"] with values [300, 450, 200].',
            starterCode: `import matplotlib.pyplot as plt

products = ["Laptop", "Phone", "Tablet"]
sales = [300, 450, 200]

# Create bar chart

`,
            solution: `import matplotlib.pyplot as plt

products = ["Laptop", "Phone", "Tablet"]
sales = [300, 450, 200]

plt.bar(products, sales, color='#05d9e8')
plt.xlabel('Product')
plt.ylabel('Sales')
plt.title('Sales by Product')
plt.show()`,
            tests: [
                { name: 'Creates bar chart', check: (code) => code.includes('plt.bar(') },
                { name: 'Uses products and sales', check: (code) => code.includes('products') && code.includes('sales') },
                { name: 'Has labels', check: (code) => code.includes('xlabel') && code.includes('ylabel') }
            ],
            xp: 150,
            language: 'python',
            hints: ['plt.bar(categories, values)', 'Add color parameter for style', 'Label axes']
        },
        {
            id: 13,
            title: 'Pie Charts',
            subtitle: 'Show Proportions',
            story: 'Pie charts show parts of a whole. Market share, budget allocation.',
            concept: `
                <h3>Pie Charts</h3>
                <pre><code>labels = ['Chrome', 'Firefox', 'Safari']
sizes = [65, 20, 15]

plt.pie(sizes, labels=labels, autopct='%1.1f%%')
plt.title('Browser Market Share')
plt.show()</code></pre>
            `,
            challenge: 'Create a pie chart showing expense breakdown: Rent 40%, Food 25%, Transport 20%, Other 15%.',
            starterCode: `import matplotlib.pyplot as plt

categories = ['Rent', 'Food', 'Transport', 'Other']
percentages = [40, 25, 20, 15]

# Create pie chart with percentages displayed

`,
            solution: `import matplotlib.pyplot as plt

categories = ['Rent', 'Food', 'Transport', 'Other']
percentages = [40, 25, 20, 15]

plt.pie(percentages, labels=categories, autopct='%1.1f%%')
plt.title('Monthly Expenses')
plt.show()`,
            tests: [
                { name: 'Creates pie chart', check: (code) => code.includes('plt.pie(') },
                { name: 'Has labels', check: (code) => code.includes('labels=') },
                { name: 'Shows percentages', check: (code) => code.includes('autopct') }
            ],
            xp: 125,
            language: 'python',
            hints: ['plt.pie(values, labels=names)', 'autopct shows percentages', '%1.1f%% format string']
        },
        {
            id: 14,
            title: 'Statistical Analysis',
            subtitle: 'Describe Your Data',
            story: 'Statistics reveal insights. Mean, median, std deviation.',
            concept: `
                <h3>Pandas Statistics</h3>
                <pre><code># Quick statistics
df.describe()  # Full summary

# Individual stats
df['sales'].mean()    # Average
df['sales'].median()  # Middle value
df['sales'].std()     # Standard deviation
df['sales'].var()     # Variance

# Correlation
df.corr()  # Correlation matrix</code></pre>
            `,
            challenge: 'Calculate mean, median, and standard deviation for the scores. Print all three.',
            starterCode: `import pandas as pd

df = pd.DataFrame({
    'student': ['A', 'B', 'C', 'D', 'E'],
    'score': [85, 92, 78, 95, 88]
})

# Calculate and print mean, median, std

`,
            solution: `import pandas as pd

df = pd.DataFrame({
    'student': ['A', 'B', 'C', 'D', 'E'],
    'score': [85, 92, 78, 95, 88]
})

mean = df['score'].mean()
median = df['score'].median()
std = df['score'].std()

print('Mean:', mean)
print('Median:', median)
print('Std Dev:', std)`,
            tests: [
                { name: 'Calculates mean', check: (code) => code.includes('.mean()') },
                { name: 'Calculates median', check: (code) => code.includes('.median()') },
                { name: 'Calculates std', check: (code) => code.includes('.std()') },
                { name: 'Prints results', check: (code) => code.includes('print') }
            ],
            xp: 150,
            language: 'python',
            hints: ['df["score"].mean()', '.median() for middle', '.std() for standard deviation']
        },
        {
            id: 15,
            title: 'BOSS: Full Report',
            subtitle: 'Complete Analysis',
            story: '⚠️ FINAL BOSS ⚠️ Create a full data report: load data, analyze, visualize, and summarize findings!',
            concept: `<h3>Data Report</h3><p>Combine everything: Pandas + Stats + Visualization!</p>`,
            challenge: 'Analyze monthly revenue: calculate stats, find best/worst months, create a bar chart.',
            starterCode: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    'month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    'revenue': [12000, 15000, 11000, 18000, 14000, 20000]
})

# 1. Calculate mean, max, min revenue
# 2. Find best month (max) and worst month (min)
# 3. Create bar chart
# 4. Print summary

`,
            solution: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    'month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    'revenue': [12000, 15000, 11000, 18000, 14000, 20000]
})

mean_rev = df['revenue'].mean()
max_rev = df['revenue'].max()
min_rev = df['revenue'].min()

best_month = df.loc[df['revenue'].idxmax(), 'month']
worst_month = df.loc[df['revenue'].idxmin(), 'month']

print("Average Revenue:", mean_rev)
print("Best Month:", best_month, "(", max_rev, ")")
print("Worst Month:", worst_month, "(", min_rev, ")")

plt.bar(df['month'], df['revenue'], color='#05d9e8')
plt.xlabel('Month')
plt.ylabel('Revenue ($)')
plt.title('Monthly Revenue Report')
plt.show()`,
            tests: [
                { name: 'Calculates statistics', check: (code) => code.includes('.mean()') && (code.includes('.max()') || code.includes('.min()')) },
                { name: 'Finds best/worst month', check: (code) => code.includes('idxmax') || code.includes('idxmin') || (code.includes('max') && code.includes('month')) },
                { name: 'Creates visualization', check: (code) => code.includes('plt.bar') || code.includes('.plot(') },
                { name: 'Prints report', check: (code) => code.includes('print') }
            ],
            xp: 500,
            language: 'python',
            isBoss: true,
            hints: ['.idxmax() returns index of max value', 'df.loc[index, column] to get value', 'Combine stats and chart for full report']
        }
    ],

    // ==========================================
    // Mobile Dev Lessons
    // ==========================================
    mobile: [
        {
            id: 1,
            title: 'React Native Intro',
            subtitle: 'Mobile with JavaScript',
            story: 'Build mobile apps with JavaScript! React Native powers Instagram, Facebook, and more.',
            concept: `
                <h3>React Native Basics</h3>
                <pre><code>import { View, Text } from 'react-native';

function App() {
    return (
        &lt;View&gt;
            &lt;Text&gt;Hello Mobile!&lt;/Text&gt;
        &lt;/View&gt;
    );
}</code></pre>
            `,
            challenge: 'Create a simple React Native component that displays "Welcome to My App" in a Text component.',
            starterCode: `import { View, Text } from 'react-native';

function App() {
    return (
        <View>
            {/* Add your Text component here */}

        </View>
    );
}`,
            solution: `import { View, Text } from 'react-native';

function App() {
    return (
        <View>
            <Text>Welcome to My App</Text>
        </View>
    );
}`,
            tests: [
                { name: 'Has View container', check: (code) => code.includes('<View>') },
                { name: 'Has Text component', check: (code) => code.includes('<Text>') },
                { name: 'Has welcome message', check: (code) => code.includes('Welcome') }
            ],
            xp: 75,
            language: 'javascript',
            hints: ['Use <Text>Your message</Text>', 'Text goes inside View']
        },
        {
            id: 2,
            title: 'Styling Native',
            subtitle: 'StyleSheet',
            story: 'Mobile styling uses a special StyleSheet object - similar to CSS but different.',
            concept: `
                <h3>React Native Styles</h3>
                <pre><code>import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        padding: 20
    },
    title: {
        fontSize: 24,
        color: '#05d9e8'
    }
});

// Usage: style={styles.container}</code></pre>
            `,
            challenge: 'Create a StyleSheet with a "header" style: fontSize 32, color cyan (#05d9e8), fontWeight "bold".',
            starterCode: `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Add your header style here

});`,
            solution: `import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        color: '#05d9e8',
        fontWeight: 'bold'
    }
});`,
            tests: [
                { name: 'Uses StyleSheet.create', check: (code) => code.includes('StyleSheet.create') },
                { name: 'Has header style', check: (code) => code.includes('header') },
                { name: 'Sets fontSize', check: (code) => code.includes('fontSize') && code.includes('32') },
                { name: 'Sets color', check: (code) => code.includes('05d9e8') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Styles use camelCase (fontSize not font-size)', 'Colors are strings']
        },
        {
            id: 3,
            title: 'Touchable Elements',
            subtitle: 'Buttons & Presses',
            story: 'Mobile apps respond to touch. Create interactive buttons!',
            concept: `
                <h3>Touch Components</h3>
                <pre><code>import { TouchableOpacity, Button } from 'react-native';

&lt;TouchableOpacity onPress={() => alert('Pressed!')}&gt;
    &lt;Text&gt;Tap Me&lt;/Text&gt;
&lt;/TouchableOpacity&gt;

&lt;Button title="Click" onPress={handlePress} /&gt;</code></pre>
            `,
            challenge: 'Create a TouchableOpacity that logs "Button pressed!" when tapped.',
            starterCode: `import { View, Text, TouchableOpacity } from 'react-native';

function App() {
    return (
        <View>
            {/* Add TouchableOpacity with onPress */}

        </View>
    );
}`,
            solution: `import { View, Text, TouchableOpacity } from 'react-native';

function App() {
    return (
        <View>
            <TouchableOpacity onPress={() => console.log('Button pressed!')}>
                <Text>Press Me</Text>
            </TouchableOpacity>
        </View>
    );
}`,
            tests: [
                { name: 'Uses TouchableOpacity', check: (code) => code.includes('TouchableOpacity') },
                { name: 'Has onPress handler', check: (code) => code.includes('onPress') },
                { name: 'Logs message', check: (code) => code.includes('console.log') || code.includes('alert') }
            ],
            xp: 100,
            language: 'javascript',
            hints: ['Use onPress={() => ...}', 'Put Text inside TouchableOpacity']
        },
        {
            id: 4,
            title: 'State Management',
            subtitle: 'useState Hook',
            story: 'State makes your app dynamic. Change data, update the UI!',
            concept: `
                <h3>useState Hook</h3>
                <pre><code>import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        &lt;View&gt;
            &lt;Text&gt;{count}&lt;/Text&gt;
            &lt;Button title="Add" onPress={() =&gt; setCount(count + 1)} /&gt;
        &lt;/View&gt;
    );
}</code></pre>
            `,
            challenge: 'Create a counter with useState. Start at 0, add a button that increments by 1.',
            starterCode: `import { useState } from 'react';
import { View, Text, Button } from 'react-native';

function Counter() {
    // Add useState for count

    return (
        <View>
            {/* Display count and add increment button */}

        </View>
    );
}`,
            solution: `import { useState } from 'react';
import { View, Text, Button } from 'react-native';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <View>
            <Text>{count}</Text>
            <Button title="Add" onPress={() => setCount(count + 1)} />
        </View>
    );
}`,
            tests: [
                { name: 'Uses useState', check: (code) => code.includes('useState') },
                { name: 'Initializes to 0', check: (code) => code.includes('useState(0)') },
                { name: 'Has setter function', check: (code) => code.includes('setCount') },
                { name: 'Increments on press', check: (code) => code.includes('count + 1') || code.includes('count+1') }
            ],
            xp: 150,
            language: 'javascript',
            hints: ['const [count, setCount] = useState(0)', 'Call setCount(count + 1) to increment']
        },
        {
            id: 5,
            title: 'BOSS: Todo Mobile',
            subtitle: 'Full Mobile App',
            story: '⚠️ BOSS BATTLE ⚠️ Build a mobile todo app with add and display functionality!',
            concept: `<h3>Combine Everything</h3><p>State, lists, touch events, styling!</p>`,
            challenge: 'Create a todo app with TextInput, Add button, and FlatList to display todos.',
            starterCode: `import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

function TodoApp() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);

    // Add function to add todo

    return (
        <View>
            {/* TextInput, Button, and FlatList */}

        </View>
    );
}`,
            solution: `import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

function TodoApp() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (text) {
            setTodos([...todos, { id: Date.now(), text }]);
            setText('');
        }
    };

    return (
        <View>
            <TextInput value={text} onChangeText={setText} placeholder="Add todo" />
            <Button title="Add" onPress={addTodo} />
            <FlatList
                data={todos}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Text>{item.text}</Text>}
            />
        </View>
    );
}`,
            tests: [
                { name: 'Uses useState for todos', check: (code) => code.includes('useState') && code.includes('todos') },
                { name: 'Has TextInput', check: (code) => code.includes('TextInput') },
                { name: 'Has FlatList', check: (code) => code.includes('FlatList') },
                { name: 'Adds to todos array', check: (code) => code.includes('setTodos') && code.includes('...todos') }
            ],
            xp: 400,
            language: 'javascript',
            isBoss: true,
            hints: ['Use spread operator to add: [...todos, newTodo]', 'FlatList needs data and renderItem props']
        },
        {
            id: 6,
            title: 'Navigation',
            subtitle: 'React Navigation',
            story: 'Apps have multiple screens. Navigate between them!',
            concept: `
                <h3>Stack Navigation</h3>
                <pre><code>import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
    return (
        &lt;NavigationContainer&gt;
            &lt;Stack.Navigator&gt;
                &lt;Stack.Screen name="Home" component={HomeScreen} /&gt;
                &lt;Stack.Screen name="Details" component={DetailsScreen} /&gt;
            &lt;/Stack.Navigator&gt;
        &lt;/NavigationContainer&gt;
    );
}

// Navigate: navigation.navigate('Details')</code></pre>
            `,
            challenge: 'Set up a Stack Navigator with Home and Profile screens.',
            starterCode: `import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() { return <Text>Home</Text>; }
function ProfileScreen() { return <Text>Profile</Text>; }

const Stack = createStackNavigator();

function App() {
    // Set up navigation
}`,
            solution: `import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() { return <Text>Home</Text>; }
function ProfileScreen() { return <Text>Profile</Text>; }

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}`,
            tests: [
                { name: 'Has NavigationContainer', check: (code) => code.includes('<NavigationContainer>') },
                { name: 'Has Stack.Navigator', check: (code) => code.includes('<Stack.Navigator>') },
                { name: 'Has two screens', check: (code) => code.includes('Stack.Screen') && code.includes('Home') && code.includes('Profile') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['Wrap in NavigationContainer', 'Stack.Screen for each route', 'name and component props required']
        },
        {
            id: 7,
            title: 'API Calls',
            subtitle: 'Fetch Data',
            story: 'Mobile apps need data. Fetch from APIs!',
            concept: `
                <h3>Fetching Data</h3>
                <pre><code>import { useState, useEffect } from 'react';

function DataScreen() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.example.com/data')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            });
    }, []);

    if (loading) return &lt;Text&gt;Loading...&lt;/Text&gt;;
    return &lt;Text&gt;{data.title}&lt;/Text&gt;;
}</code></pre>
            `,
            challenge: 'Create a component that fetches user data from an API and displays loading state.',
            starterCode: `import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function UserProfile() {
    // Add state for user and loading

    // Fetch user data on mount

    // Show loading or user data
}`,
            solution: `import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.example.com/user')
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <Text>Loading...</Text>;

    return (
        <View>
            <Text>{user.name}</Text>
        </View>
    );
}`,
            tests: [
                { name: 'Has loading state', check: (code) => code.includes('loading') && code.includes('useState') },
                { name: 'Uses useEffect', check: (code) => code.includes('useEffect') },
                { name: 'Fetches data', check: (code) => code.includes('fetch(') },
                { name: 'Shows loading', check: (code) => code.includes('Loading') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['useState for user and loading', 'useEffect with empty deps []', 'Check loading before rendering data']
        },
        {
            id: 8,
            title: 'ScrollView & Lists',
            subtitle: 'Scrollable Content',
            story: 'Mobile screens are small. Scroll through content!',
            concept: `
                <h3>ScrollView & FlatList</h3>
                <pre><code>import { ScrollView, FlatList } from 'react-native';

// ScrollView - for small lists
&lt;ScrollView&gt;
    {items.map(item =&gt; &lt;Text key={item.id}&gt;{item.name}&lt;/Text&gt;)}
&lt;/ScrollView&gt;

// FlatList - for large lists (optimized)
&lt;FlatList
    data={items}
    keyExtractor={item =&gt; item.id}
    renderItem={({item}) =&gt; &lt;Text&gt;{item.name}&lt;/Text&gt;}
/&gt;</code></pre>
            `,
            challenge: 'Create a FlatList that displays a list of messages with sender and text.',
            starterCode: `import { View, FlatList, Text } from 'react-native';

const messages = [
    { id: '1', sender: 'Alice', text: 'Hello!' },
    { id: '2', sender: 'Bob', text: 'Hi there!' },
    { id: '3', sender: 'Alice', text: 'How are you?' }
];

function MessageList() {
    // Create FlatList to display messages
}`,
            solution: `import { View, FlatList, Text } from 'react-native';

const messages = [
    { id: '1', sender: 'Alice', text: 'Hello!' },
    { id: '2', sender: 'Bob', text: 'Hi there!' },
    { id: '3', sender: 'Alice', text: 'How are you?' }
];

function MessageList() {
    return (
        <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <View>
                    <Text style={{fontWeight: 'bold'}}>{item.sender}</Text>
                    <Text>{item.text}</Text>
                </View>
            )}
        />
    );
}`,
            tests: [
                { name: 'Uses FlatList', check: (code) => code.includes('<FlatList') },
                { name: 'Has data prop', check: (code) => code.includes('data=') },
                { name: 'Has keyExtractor', check: (code) => code.includes('keyExtractor') },
                { name: 'Has renderItem', check: (code) => code.includes('renderItem') }
            ],
            xp: 150,
            language: 'javascript',
            hints: ['FlatList requires data, keyExtractor, renderItem', 'renderItem receives {item}', 'Access item properties in render']
        },
        {
            id: 9,
            title: 'User Input',
            subtitle: 'Forms & TextInput',
            story: 'Collect user input. TextInput handles typing!',
            concept: `
                <h3>TextInput</h3>
                <pre><code>import { TextInput } from 'react-native';

function Form() {
    const [email, setEmail] = useState('');

    return (
        &lt;TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
        /&gt;
    );
}</code></pre>
            `,
            challenge: 'Create a login form with email and password TextInputs and a submit button.',
            starterCode: `import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

function LoginForm() {
    // Add state for email and password

    const handleLogin = () => {
        // Show alert with email
    };

    return (
        <View>
            {/* Add TextInputs and Button */}
        </View>
    );
}`,
            solution: `import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        Alert.alert('Login', 'Email: ' + email);
    };

    return (
        <View>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}`,
            tests: [
                { name: 'Has email state', check: (code) => code.includes('email') && code.includes('setEmail') },
                { name: 'Has password state', check: (code) => code.includes('password') && code.includes('setPassword') },
                { name: 'Has TextInputs', check: (code) => (code.match(/<TextInput/g) || []).length >= 2 },
                { name: 'Has secure password', check: (code) => code.includes('secureTextEntry') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['useState for each input', 'secureTextEntry hides password', 'onChangeText updates state']
        },
        {
            id: 10,
            title: 'AsyncStorage',
            subtitle: 'Local Data Storage',
            story: 'Save data locally. AsyncStorage persists across app restarts.',
            concept: `
                <h3>AsyncStorage</h3>
                <pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('user', JSON.stringify(user));

// Load
const data = await AsyncStorage.getItem('user');
const user = JSON.parse(data);

// Remove
await AsyncStorage.removeItem('user');</code></pre>
            `,
            challenge: 'Create functions to save and load user settings using AsyncStorage.',
            starterCode: `import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveSettings(settings) {
    // Save settings object to AsyncStorage
}

async function loadSettings() {
    // Load and return settings from AsyncStorage
}`,
            solution: `import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveSettings(settings) {
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
}

async function loadSettings() {
    const data = await AsyncStorage.getItem('settings');
    return data ? JSON.parse(data) : null;
}`,
            tests: [
                { name: 'Uses setItem', check: (code) => code.includes('AsyncStorage.setItem') },
                { name: 'Uses getItem', check: (code) => code.includes('AsyncStorage.getItem') },
                { name: 'Stringifies data', check: (code) => code.includes('JSON.stringify') },
                { name: 'Parses data', check: (code) => code.includes('JSON.parse') }
            ],
            xp: 175,
            language: 'javascript',
            hints: ['JSON.stringify to save objects', 'await AsyncStorage methods', 'JSON.parse to restore objects']
        },
        {
            id: 11,
            title: 'Modal & Alerts',
            subtitle: 'Popups & Dialogs',
            story: 'Get user attention. Modals and alerts for important info.',
            concept: `
                <h3>Modals & Alerts</h3>
                <pre><code>import { Modal, Alert } from 'react-native';

// Alert
Alert.alert('Title', 'Message', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => console.log('OK') }
]);

// Modal
&lt;Modal visible={showModal} animationType="slide"&gt;
    &lt;View&gt;
        &lt;Text&gt;Modal Content&lt;/Text&gt;
        &lt;Button title="Close" onPress={() =&gt; setShowModal(false)} /&gt;
    &lt;/View&gt;
&lt;/Modal&gt;</code></pre>
            `,
            challenge: 'Create a component with a button that opens a modal. Modal should have a close button.',
            starterCode: `import { useState } from 'react';
import { View, Modal, Text, Button } from 'react-native';

function ModalExample() {
    // Add state for modal visibility

    return (
        <View>
            {/* Button to open modal */}

            {/* Modal component */}

        </View>
    );
}`,
            solution: `import { useState } from 'react';
import { View, Modal, Text, Button } from 'react-native';

function ModalExample() {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <Button title="Open Modal" onPress={() => setVisible(true)} />

            <Modal visible={visible} animationType="slide">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Hello from Modal!</Text>
                    <Button title="Close" onPress={() => setVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}`,
            tests: [
                { name: 'Has visibility state', check: (code) => code.includes('useState') && code.includes('visible') },
                { name: 'Has Modal component', check: (code) => code.includes('<Modal') },
                { name: 'Opens modal', check: (code) => code.includes('setVisible(true)') || code.includes('setVisible( true)') },
                { name: 'Closes modal', check: (code) => code.includes('setVisible(false)') || code.includes('setVisible( false)') }
            ],
            xp: 150,
            language: 'javascript',
            hints: ['useState for visible/setVisible', 'Modal visible prop controls display', 'Button onPress toggles state']
        },
        {
            id: 12,
            title: 'BOSS: Complete App',
            subtitle: 'Full Mobile App',
            story: '⚠️ FINAL BOSS ⚠️ Build a complete mobile app with navigation, data fetching, storage, and UI!',
            concept: `<h3>Full App Architecture</h3><p>Navigation + State + Storage + API = Complete App!</p>`,
            challenge: 'Create a notes app: list notes, add new notes, save to AsyncStorage, persist on reload.',
            starterCode: `import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');

    // Load notes on mount

    // Save notes function

    // Add note function

    return (
        <View style={{flex: 1, padding: 20}}>
            {/* TextInput and Add button */}

            {/* FlatList of notes */}
        </View>
    );
}`,
            solution: `import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const saved = await AsyncStorage.getItem('notes');
        if (saved) setNotes(JSON.parse(saved));
    };

    const saveNotes = async (newNotes) => {
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    };

    const addNote = () => {
        if (text.trim()) {
            const newNotes = [...notes, { id: Date.now().toString(), text }];
            setNotes(newNotes);
            saveNotes(newNotes);
            setText('');
        }
    };

    return (
        <View style={{flex: 1, padding: 20}}>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="New note..."
                style={{borderWidth: 1, padding: 10, marginBottom: 10}}
            />
            <Button title="Add Note" onPress={addNote} />

            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Text style={{padding: 10, borderBottomWidth: 1}}>{item.text}</Text>
                )}
            />
        </View>
    );
}`,
            tests: [
                { name: 'Has useState for notes', check: (code) => code.includes('notes') && code.includes('setNotes') },
                { name: 'Uses AsyncStorage', check: (code) => code.includes('AsyncStorage') },
                { name: 'Loads on mount', check: (code) => code.includes('useEffect') },
                { name: 'Has FlatList', check: (code) => code.includes('<FlatList') },
                { name: 'Adds new notes', check: (code) => code.includes('...notes') || code.includes('setNotes') }
            ],
            xp: 500,
            language: 'javascript',
            isBoss: true,
            hints: ['useEffect to load notes on mount', 'Save after every add', 'Spread operator to add: [...notes, newNote]', 'FlatList for efficient rendering']
        }
    ],

    // ==========================================
    // Helper Methods
    // ==========================================
    getPath(pathId) {
        return this.paths[pathId];
    },

    getLesson(pathId, lessonId) {
        const lessons = this[pathId];
        if (lessons) {
            return lessons.find(l => l.id === lessonId);
        }
        return null;
    },

    getAllPaths() {
        return Object.values(this.paths);
    },

    getLessonsForPath(pathId) {
        return this[pathId] || [];
    },

    isPathUnlocked(player, pathId) {
        const path = this.paths[pathId];
        if (!path) return false;
        if (path.unlocked) return true;

        // Check requirements
        if (path.requires) {
            for (const [reqPath, reqLessons] of Object.entries(path.requires)) {
                const completed = player.completedLessons[reqPath]?.length || 0;
                if (completed < reqLessons) return false;
            }
        }
        return true;
    },

    getNextLesson(player, pathId) {
        const lessons = this[pathId];
        if (!lessons) return null;

        for (const lesson of lessons) {
            if (!player.completedLessons[pathId]?.includes(lesson.id)) {
                return lesson;
            }
        }
        return null; // All completed
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LessonData;
}
