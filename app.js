// Class to represent a team member
class TeamMember {
    constructor(name, type, skills, hp, attack, defense) {
        this.name = name;
        this.type = type;
        this.skills = skills;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
    }
}

// Create a hero instance of TeamMember
const hero = new TeamMember("Peter", "Engineer", ["Repair", "Craft", "Lead"], 120, 12, 8);
console.log("Hero Created:", hero);

// Array to store team members; starts with only the hero
let teamMembers = [hero];

// Function to display team members on the UI
function displayTeamMembers() {
    const teamListDiv = document.getElementById('teamList');
    teamListDiv.innerHTML = ''; 

    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';
        memberDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3>${member.name}</h3>
                    <p>Type: ${member.type}</p>
                    <p>Skills: ${member.skills.join(', ')}</p>
                    <p>HP: ${member.hp}</p>
                    <p>Attack: ${member.attack}</p>
                    <p>Defense: ${member.defense}</p>
                </div>
            </div>
        `;
        teamListDiv.appendChild(memberDiv);
    });
}
console.log("Displaying team members...");
displayTeamMembers();

// Variable to keep track of steps taken
let steps = 0;

// Array of structured events for each step
const stepEvents = [
    { type: 'battle', enemy: 'Space Pirate', hp: 80 },
    { type: 'battle', enemy: 'Alien Warrior', hp: 100 },
    { type: 'battle', enemy: 'Robot Invader', hp: 90 },
    { type: 'planet', event: 'Galactic Shop' }, 
    { type: 'battle', enemy: 'Cosmic Dragon', hp: 150 },
    { type: 'battle', enemy: 'Space Pirate', hp: 80 },
    { type: 'battle', enemy: 'Alien Warrior', hp: 100 },
    { type: 'planet', event: 'Research Lab' },
    { type: 'battle', enemy: 'Cosmic Dragon', hp: 200 },
    { type: 'battle', enemy: 'Space Pirate', hp: 180 },
    { type: 'battle', enemy: 'Alien Warrior', hp: 190 },
    { type: 'battle', enemy: 'Cosmic Dragon', hp: 180 },
    { type: 'battle', enemy: 'Space Pirate Chef', hp: 280 },
    { type: 'planet', event: 'Before the end' },
    { type: 'battle', enemy: 'President of Alien', hp: 300 },
    // ... continue in this pattern as needed
];

// Function to roll dice and move to the next step/event
function rollDice() {
    const currentStepElem = document.getElementById("currentStep");
    steps++;
    currentStepElem.innerText = steps;

    console.log("Step incremented to:", steps);

    if(steps <= stepEvents.length) {
        const currentEvent = stepEvents[steps - 1];
        console.log("Current Event:", currentEvent.type);
        
        switch (currentEvent.type) {
            case 'battle':
                showView('battle');
                startBattle(currentEvent.enemy, currentEvent.hp);
                break;

            case 'planet':
                showView('planet');
                // Handle planet events here, such as displaying specific details for each event
                console.log(`Planet event: ${currentEvent.event}`);
                break;

            // Add more case statements if there are more event types in the future

            default:
                console.log("Unknown event type.");
        }
        
    } else {
        console.log('Game over!');
        var gameWinModal = new bootstrap.Modal(document.getElementById('gameWinModal'));
        gameWinModal.show();
    }
}

function showView(viewId) {
    const views = document.querySelectorAll('.tab-pane');
    views.forEach(view => view.classList.remove('show', 'active'));

    const view = document.getElementById(viewId);
    if (!view) {
        console.error(`No view found with ID: ${viewId}`);
        return;
    }

    view.classList.add('show', 'active');
    console.log(`Showing view: ${viewId}`);
}

let playerHealth = 1000;

// Function to handle a battle
function startBattle(enemyName, hp) {
    let enemyHealth = hp;
    document.getElementById("enemyHealth").textContent = enemyHealth;

    console.log(`Starting battle against ${enemyName} with ${hp} HP...`);

    let isPlayerTurn = true;

    while (playerHealth > 0 && enemyHealth > 0) {
        if (isPlayerTurn) {
            let playerAttack = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
            enemyHealth -= playerAttack;
            document.getElementById("enemyHealth").textContent = enemyHealth;
            document.getElementById("battleLog").innerHTML += `<p>You attacked ${enemyName} for ${playerAttack} damage!</p>`;
            console.log(`Player attacked ${enemyName} for ${playerAttack} damage.`);
        } else {
            let enemyAttack = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
            playerHealth -= enemyAttack;
            document.getElementById("playerHealth").textContent = playerHealth;
            document.getElementById("battleLog").innerHTML += `<p>${enemyName} attacked you for ${enemyAttack} damage!</p>`;
            console.log(`${enemyName} attacked player for ${enemyAttack} damage.`);
        }
        isPlayerTurn = !isPlayerTurn;
    }

    if (playerHealth <= 0) {
        document.getElementById("battleLog").innerHTML += "<p>You've been defeated!</p>";
        console.log("Player has been defeated.");

        var gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'), {
            backdrop: 'static',
            keyboard: false
        });

        gameOverModal.show();
    } else {
        document.getElementById("battleLog").innerHTML += `<p>You've defeated ${enemyName}!</p>`;
        console.log(`Player defeated ${enemyName}.`);

        const nextBtn = document.getElementById("nextBTN");
        nextBtn.classList.remove("disabled");
    }
}

// Function to restart the game
function restartGame() {
    console.log("Restarting the game...");
    location.reload();
}

// Function to handle clicking on the Shop card
function handleShopClick() {
    console.log("You visited the Galactic Shop!");
    showView('galaxy');
}

// Function to handle clicking on the Inn card
function handleInnClick() {
    console.log("You stayed at the Cosmic Inn!");
    showView("galaxy");
}

// Function to handle clicking on the Research Lab card
function handleLabClick() {
    console.log("You entered the Research Lab!");
    showView("galaxy");
}

// Grab the card elements from the DOM
const shopCard = document.querySelector("#planet .col-sm-4:nth-child(1) .card");
const innCard = document.querySelector("#planet .col-sm-4:nth-child(2) .card");
const labCard = document.querySelector("#planet .col-sm-4:nth-child(3) .card");

// Add click event listeners to each card
shopCard.addEventListener('click', handleShopClick);
innCard.addEventListener('click', handleInnClick);
labCard.addEventListener('click', handleLabClick);
