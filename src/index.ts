/* Lecture 2
 * CSCI 4611, Spring 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as paper from 'paper';
import { Tool } from 'paper/dist/paper-core';

class Game 
{
    // Width and height are defined in project coordinates
    // This is different than screen coordinates!
    private width : number;
    private height : number;
    
    constructor()
    {
        paper.setup('canvas');
        this.width = 1200;
        this.height = 800;
    }

    start() : void 
    {
        this.createScene();
        this.resize();

        // This registers the event handlers for window and mouse events
        paper.view.onResize = () => {this.resize();};
        paper.view.onMouseMove = (event: paper.MouseEvent) => {this.onMouseMove(event)};
        paper.view.onMouseDown = (event: paper.MouseEvent) => {this.onMouseDown(event)};
        paper.view.onFrame = (event: GameEvent) => {this.update(event)};
    }

    private createScene() : void 
    {
       // Add code here
    }

    // This method will be called once per frame
    private update(event: GameEvent) : void
    {
        // Add code here
    }

    private onMouseMove(event: paper.MouseEvent) : void
    {
        // Add code here
    }

    private onMouseDown(event: paper.MouseEvent) : void
    {
        // Add code here
    }  

    // This handles dynamic resizing of the browser window
    // You do not need to modify this function
    private resize() : void
    {
        var aspectRatio = this.width / this.height;
        var newAspectRatio = paper.view.viewSize.width / paper.view.viewSize.height;
        if(newAspectRatio > aspectRatio)
            paper.view.zoom = paper.view.viewSize.width  / this.width;    
        else
            paper.view.zoom = paper.view.viewSize.height / this.height;
        
        paper.view.center = new paper.Point(this.width / 2, this.height / 2);
        
    }  
}

// This is included because the paper is missing a TypeScript definition
// You do not need to modify it
class GameEvent
{
    readonly delta: number;
    readonly time: number;
    readonly count: number;

    constructor()
    {
        this.delta = 0;
        this.time = 0;
        this.count = 0;
    }
}
    
// Start the game
var game = new Game();
game.start();