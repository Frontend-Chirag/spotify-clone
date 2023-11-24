import Vibrant from 'node-vibrant';


export const getDominantColor = async (imageUrl: string | undefined) => {
try {
    if (!imageUrl) {
        // Handle the case where imageUrl is undefined (e.g., return a default color)
        return 'blue';
      }

    const paletts = await Vibrant.from(imageUrl).getPalette();
    const dominantColor = paletts.Vibrant?.getHex();

    return dominantColor ;

} catch (error) {
    console.log(error);
}
}