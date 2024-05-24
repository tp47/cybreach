import editIcon from '/src/assets/svg/edit.svg'
import deleteIcon from '/src/assets/svg/delete.svg'

interface EditBarProps {
  onDelete: () => void | void
  onEdit: () => void | void
  vertical?: undefined
  small?: undefined
}

export default function EditBar({ onDelete, onEdit }: EditBarProps) {
  return (
    <div className="flex justify-between h-10 gap-1">
      <button className="w-1/2 p-0 hover:scale-110" onClick={onEdit}>
        <img className="w-6" src={editIcon} alt="edit topic button" />
      </button>
      <button className="w-1/2 p-0 hover:scale-110" onClick={onDelete}>
        <img className="w-6" src={deleteIcon} alt="delete topic button" />
      </button>
    </div>
  )
}
