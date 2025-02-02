// ==UserScript==
// @name         MyAnimeList Redirects with Context Menu
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds a custom context menu on right click to perform various actions on MyAnimeList anime pages
// @author       Korpez
// @match        https://myanimelist.net/anime/*
// @icon         https://www.google.com/s2/favicons?domain=myanimelist.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get the anime title from the page
    let animeTitle = document.querySelector('h1.title-name strong').innerText;

    // Create the custom context menu
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default context menu from appearing

        // Remove any existing custom context menu
        let existingMenu = document.getElementById('customContextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Create a new context menu element
        let menu = document.createElement('div');
        menu.id = 'customContextMenu';
        menu.style.position = 'absolute';
        menu.style.top = `${event.pageY}px`;
        menu.style.left = `${event.pageX}px`;
        menu.style.backgroundColor = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.padding = '10px';
        menu.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        menu.style.zIndex = '1000';

        // Add options to the context menu
        const options = [
            { label: 'Watch Now', icon: 'https://www.google.com/s2/favicons?domain=crunchyroll.com', action: () => {
                let query = encodeURIComponent(animeTitle);
                window.open(`https://animekai.to/browser?keyword=${query}`, '_blank');
            }},
            { label: 'Search 4chan', icon: 'https://www.google.com/s2/favicons?domain=4chan.org', action: () => {
                let query = encodeURIComponent(`"${animeTitle}" inurl:4chanarchives`);
                window.open(`https://presearch.com/search?q=${query}`, '_blank');
            }},
            { label: 'Search /a/', icon: 'https://www.google.com/s2/favicons?domain=4chan.org', action: () => {
                let query = encodeURIComponent(animeTitle);
                window.open(`https://desuarchive.org/a/search/text/?keyword=${query}`, '_blank');
            }},
            { label: 'Search Trailer', icon: 'https://www.google.com/s2/favicons?domain=youtube.com', action: () => {
                let query = encodeURIComponent(animeTitle);
                window.open(`https://www.youtube.com/results?search_query=${query} trailer anime`, '_blank');
            }},
            { label: 'Search Twitter', icon: 'https://cdn-icons-png.flaticon.com/128/3256/3256013.png', action: () => {
                let query = encodeURIComponent(animeTitle);
                window.open(`https://xcancel.com/search?f=tweets&q=${query} anime&since=&until=&near=`, '_blank');
            }},
            { label: 'Search Reddit', icon: 'https://www.google.com/s2/favicons?domain=reddit.com', action: () => {
                let query = encodeURIComponent(animeTitle);
                window.open(`https://old.reddit.com/r/anime/search/?q=${query}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`, '_blank');
            }},
            { label: 'Search Fandom', icon: 'https://www.google.com/s2/favicons?domain=fandom.com', action: () => {
                    let query = encodeURIComponent(animeTitle);
                    window.open(`https://community.fandom.com/wiki/Special:Search?query=${query}&scope=cross-wiki`, '_blank');
            }},
            { label: 'Copy to Clipboard', icon: 'https://cdn-icons-png.flaticon.com/128/6207/6207190.png', action: () => {
                navigator.clipboard.writeText(animeTitle).then(() => {
                    alert('Anime title copied to clipboard!');
                }).catch(err => {
                    alert('Failed to copy: ' + err);
                });
            }}
        ];

        options.forEach(option => {
            let menuItem = document.createElement('div');
            menuItem.style.display = 'flex';
            menuItem.style.alignItems = 'center';
            menuItem.style.padding = '5px 0';
            menuItem.style.cursor = 'pointer';

            // Add icon to the menu item
            let icon = document.createElement('img');
            icon.src = option.icon;
            icon.style.width = '16px';
            icon.style.height = '16px';
            icon.style.marginRight = '8px';
            menuItem.appendChild(icon);

            // Add label to the menu item
            let label = document.createElement('span');
            label.innerText = option.label;
            menuItem.appendChild(label);

            // Add hover effect
            menuItem.addEventListener('mouseover', () => {
                menuItem.style.backgroundColor = '#f0f0f0';
            });
            menuItem.addEventListener('mouseout', () => {
                menuItem.style.backgroundColor = '#fff';
            });

            // Add click event
            menuItem.addEventListener('click', () => {
                option.action();
                menu.remove();
            });

            menu.appendChild(menuItem);
        });

        // Append the menu to the body
        document.body.appendChild(menu);
    });

    // Remove the custom context menu if clicking elsewhere
    document.addEventListener('click', function() {
        let existingMenu = document.getElementById('customContextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }
    });
})();
