import Button from "../Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Table = ({ fonts }) => {
  const handleEdit = (id) => {
    // TODO: implementar logica
    alert(`Edit font with id: ${id}`);
  };

  const handleDelete = (id) => {
    // TODO: implementar logica
    alert(`Delete font with id: ${id}`);
  };

  return (
    <>
      {fonts.map((font) => (
        <div
          key={font.id}
          className="bg-gray-900 rounded-xl p-5 mt-3 border border-gray-800 hover:border-primary transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3
                  className={`text-white`}
                  style={{
                    fontFamily: font.name,
                    fontSize: font.size,
                    fontStyle: font.style,
                    fontWeight: font.weight,
                  }}
                >
                  {font.name}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{font.size}</span>
                <span>{font.style}</span>
                <span>{font.weight}</span>
                <span>{font.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                icon={<EditIcon color="warning" />}
                variant={"edit"}
                type={"button"}
                onClick={() => handleEdit(font.id)}
              />
              <Button
                icon={<DeleteIcon color="error" />}
                variant={"delete"}
                type={"button"}
                onClick={() => handleDelete(font.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Table;
