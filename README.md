# Ji Zhou Robotics Projects

Static project-media website prepared for GitHub Pages.

## Project sections

- Full-size humanoid: simulation, control validation, whole-body walking, and lower-body validation.
- Eight-robot G1 fleet: laboratory tests, live performance, and control architecture.
- Two-wheeled legged robot: graduation project covering design, fabrication, LQR control, height adjustment, jumping, leg motion, and simulation.
- Sorting robot: 2023 competition project, with competition and laboratory recordings and hardware photos.
- Everyday research: stage-step and robot teleoperation demonstrations.

Media are served from `dist/assets/` using descriptive ASCII filenames. Newly added videos use H.264/AAC MP4 with fast-start metadata and individual poster images; the original files remain in the sibling `video/` folder.

## Publish

1. Create a public GitHub repository, for example `robotics-projects`.
2. Upload the contents of this folder, including `.github` and `dist`.
3. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
4. Push to the `main` branch. The included workflow deploys the contents of `dist`.

The final address will normally be:

`https://jijiji999.github.io/robotics-projects/`

## Main files

- `dist/index.html`: page content
- `dist/styles.css`: responsive layout and visual design
- `dist/assets/`: project media
- `dist/Ji_Zhou_CV.pdf`: downloadable CV
