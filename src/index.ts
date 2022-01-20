/* Lecture 2
 * CSCI 4611, Spring 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as paper from 'paper';

class Game 
{
    // Width and height are defined in project coordinates
    // This is different than screen coordinates!
    private width : number;
    private height : number;
    private vertices : paper.Point[];
    private rects : paper.Path.Rectangle[];
    private selectedObject : paper.Item | undefined;
    
    constructor()
    {
        paper.setup('canvas');
        this.width = 1200;
        this.height = 800;
        this.vertices = [];
        this.rects = [];
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
        var rectangle = new paper.Rectangle(new paper.Point(0, 0), new paper.Size(50, 50));

        this.rects.push(new paper.Path.Rectangle(rectangle));
        this.rects.push(new paper.Path.Rectangle(rectangle));

        this.rects[0].strokeColor = new paper.Color('blue');
        this.rects[0].strokeWidth = 10;
        this.rects[0].fillColor = new paper.Color('purple');
        this.rects[0].position = new paper.Point(100, 100);

        this.rects[1] = new paper.Path.Rectangle(rectangle);
        this.rects[1].strokeColor = new paper.Color('blue');
        this.rects[1].strokeWidth = 10;
        this.rects[1].fillColor = new paper.Color('purple');
        this.rects[1].position = paper.view.center;
    }

    // This method will be called once per frame
    private update(event: GameEvent) : void
    {
        // Add code here
    }

    private onMouseMove(event: paper.MouseEvent) : void
    {
        if(this.selectedObject)
        {
            this.selectedObject.position = event.point;
        }
    }

    private onMouseDown(event: paper.MouseEvent) : void
    {
        if(this.selectedObject)
        {
            this.selectedObject = undefined;
        }
        else
        {
            var hit : paper.HitResult | undefined;
            for(var i=0; i < this.rects.length; i++)
            {
                var thisHit = this.rects[i].hitTest(event.point);
                if(thisHit)
                    hit = thisHit;
            }

            if(hit)
            {
                this.selectedObject = hit.item;
                console.log(hit);
            }
            else
            {
                this.selectedObject = undefined;
                console.log('No hit!');
            }
        }

        /*
        this.vertices.push(new paper.Point(event.point));

        if(this.vertices.length > 2)
        {
            var path = new paper.Path();
            for(var i = 0; i < 3; i++)
                path.add(this.vertices[i]);

            for(var i = 0; i < 3; i++)    
                this.vertices.pop();

            path.fillColor = new paper.Color('red');
        }
        */
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