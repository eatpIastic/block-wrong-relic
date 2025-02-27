/// <reference types="../CTAutocomplete" />

const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")

const colorToCoords = {
  "Green": "49,44",
  "Red": "51,42",
  "Purple": "54,41",
  "Orange": "57,42",
  "Blue": "59,44"
};


// start of this taken from bloom
register(MouseEvent, (event) => {
  const button = event.button;
  const state = event.buttonstate;

  // Only activate on a right click key press
  if (button !== 1 || !state) return;

  let heldItemName = Player.getHeldItem()?.getName()?.removeFormatting()?.split(" ");

  if (heldItemName?.[0] !== "Corrupted" || heldItemName?.[2] !== "Relic") return;

  const block = Player.lookingAt();
  
  if (block?.type?.getName() !== "Cauldron" && block?.type?.getName() !== "Anvil") return;

  const blockCoords = `${Math.trunc(block.getX())},${Math.trunc(block.getZ())}`;
  if (colorToCoords[heldItemName[1]] !== blockCoords && !Player.isSneaking()) {
    cancel(event);
  }
});
