export const modal = `
   <div class="modal_start-content">
        <div class="modal_start-clouds">
          <img src="./assets/clouds.png" alt="clouds image" />
        </div>
        <div class="modal_start-text">
          <h1 class="modal_start-h1">Guess <span class="modal_start-span">that</span> Word!?</h1>
          <p class="modal_start-p">Before the <span>shark </span>eats the <span>corgi</span></p>
        </div>
        <div class="modal_start-corgi">
          <img src="./assets/corgiswimflip.gif" alt="corgi swimming" class="corgiStart" />
        </div>
        <div class="modal_start-selectContainer">
          <fieldset>
            <legend>
              select your level
            </legend>
          </fieldset>
          <div class="modal_start-inputWrapper">
            <input type="radio" id="levelOne" name="radio_group" class="radio_group">
            <label for="levelOne" class="label">level one</label>
          </div>
          <div class="modal_start-inputWrapper">
            <input type="radio" id="levelTwo" name="radio_group" class="radio_group">
            <label for="levelTwo" class="label">level two</label>
          </div>
          <div class="modal_start-inputWrapper">
            <input type="radio" id="levelThree" name="radio_group" class="radio_group">
            <label for="levelThree" class="label">level three</label>
          </div>
        </div>
        <div class="modal_start-button">
          <button class="button" id="startButton">start</button>
        </div>


`;
