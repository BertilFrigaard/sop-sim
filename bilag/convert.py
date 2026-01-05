import os

allowed_extensions = ["tsx", "ts", "html", "css"]
blacklist = ["node_modules", "public", "assets", "copy-paste.tsx", "App.css"]
entry_point = "../frontend"

def main():
    code = read_folder(entry_point)
    # Write to disk
    file = open("out.txt", "w")
    file.write(code)

def read_folder(path):
    out_string = ""
    for item in os.listdir(path):
        if item not in blacklist:
            if "." in item:
                # File
                extension = item.split(".")
                if extension[1] in allowed_extensions:
                    print(item)
                    file = open(f"{path}/{item}", "r")
                    out_string += f"// File: {item}\n"
                    out_string += f"// Path: {path}/{item}\n\n"
                    out_string += file.read()
                    out_string += "\n\n"
                else:
                    print("NOT: " + item)
            else:
                # Folder
                out_string += read_folder(f"{path}/{item}")
    return out_string

if __name__ == "__main__":
    main()



""" file1 = open("../frontend/index.html", "r")

content = file1.read()

print(content) """


""" print(os.listdir("../frontend/src")) """

""" file = open("out.txt", "w")

file.write(content) """