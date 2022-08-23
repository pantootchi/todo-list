import './style.css';
import todayUI from './todayUI';
import projectUI from './projectUI';
import upcomingUI from './upcomingUI';
import inboxUI from './inboxUI';
import modalsUI from './modalsUI';

// Factory Function for Tab Creation
const pages = (title, icon, link) => {
    return {title, icon, link};
}

const toggleNav = function() {
    document.body.classList.toggle('collapse');
}

const addTask = function() {
    document.querySelector('.modal').classList.add('show-modal');
}

// Arrays
const homePagesArray = [pages('Inbox', 'inbox', inboxUI), pages('Today', 'today', todayUI), pages('Upcoming', 'date_range', upcomingUI)];
let projectsPagesArray = [pages('Add Projects', 'add', addTask)];
const CATEGORY = [{category: 'Home', subcategory: homePagesArray}, {category: 'Projects', subcategory: projectsPagesArray}];
const headerArray = [pages('', 'menu', toggleNav), pages('', 'add', addTask)];


export default function generateHomepage() {

    // Generate Header
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = document.title;
    header.append(h1);

    // Generate Header Icons
    for (let item of headerArray) {
        const headerIcon = document.createElement('span');
        headerIcon.classList.add('material-icons-round', 'md-36');
        headerIcon.id = headerIcon.textContent = item.icon;
        headerIcon.onclick = item.link;
        (item.icon == 'menu') ? header.insertBefore(headerIcon, h1) : header.append(headerIcon);
    }

    const main = document.createElement('main');
    const menu = document.createElement('nav');

    // Generate Nav/Sidebar Content
    CATEGORY.forEach((cat) => {
        const catContainer = document.createElement('ul');
        catContainer.id = cat.category.toLowerCase();
        menu.appendChild(catContainer);

        const catName = document.createElement('h2');
        catName.textContent = cat.category;
        catContainer.appendChild(catName);

        for (let tab of cat.subcategory) {
            const tabKey = document.createElement('li');
            tabKey.classList.add('tab');

            const tabName = document.createElement('p');
            tabName.textContent = tab.title;

            const tabIcon = document.createElement('span');
            tabIcon.classList.add('material-icons-round');
            tabIcon.textContent = tab.icon;

            tabKey.onclick = function() {
                document.querySelector('main').textContent = '';
                document.querySelector('main').appendChild(tab.link());
            }

            tabKey.append(tabIcon, tabName);
            catContainer.appendChild(tabKey);
        }
    })

    document.body.append(header, menu, main, modalsUI());
};