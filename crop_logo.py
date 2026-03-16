from PIL import Image
import os

def trim_transparent(image_path, output_path, output_ico_path):
    print(f"Opening {image_path}...")
    try:
        im = Image.open(image_path)
        if im.mode != 'RGBA':
            im = im.convert('RGBA')

        # Use the alpha channel to find the bounding box of non-transparent pixels
        alpha = im.getchannel('A')
        bbox = alpha.getbbox()
        if bbox:
            print(f"Original size: {im.size}, Bounding box: {bbox}")
            im_cropped = im.crop(bbox)
            
            width, height = im_cropped.size
            max_dim = max(width, height)
            
            # Create a new square image with a transparent background
            square_im = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
            
            # Paste the cropped image in the center
            offset = ((max_dim - width) // 2, (max_dim - height) // 2)
            square_im.paste(im_cropped, offset)
            
            # Check if output_path is same as image_path to avoid locking issues, 
            # we can save to a temp and rename, or save directly if PIL allows (it usually does if we loaded the image into memory)
            # Actually PIL reads files lazily, so let's use a temp name just in case.
            temp_path = "public/temp_logo.png"
            square_im.save(temp_path)
            
            # Save ICO representation
            # Icons usually need specific standard sizes in the file
            icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
            square_im.save(output_ico_path, format='ICO', sizes=icon_sizes)
            
            im.close()
            
            # Replace old with new
            os.replace(temp_path, output_path)
            
            print("Successfully cropped padding and regenerated logo.png and favicon.ico!")
        else:
            print("Image is entirely transparent or couldn't parse bbox.")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == '__main__':
    trim_transparent('public/logo.png', 'public/logo.png', 'public/favicon.ico')
