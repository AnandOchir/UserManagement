import { Button, Dialog, DialogActions } from "@mui/material"
import { Box } from "@mui/system"


export const PopUp = ({ ifClickedOutsideClose = true ,closeFunction = null, acceptFunction = null, popup = false, setPopup, closeValue = 'No', acceptValue = 'Yes', children }: any) => {
  const close = () => {
    if(closeFunction) {
      closeFunction()
    }
    setPopup(false)
  }

  const accept = () => {
    if(acceptFunction) {
      acceptFunction()
    }
    setPopup(false)
  }

  return (
    <Dialog
      open={popup}
      onClose={() => ifClickedOutsideClose && setPopup(false)}
    >
      <Box sx={{ padding: 2 }}>
        {children}
      </Box>
      <DialogActions>
        {
          closeValue && <Button onClick={close}>{closeValue}</Button>
        }
        {
          acceptValue && <Button onClick={accept} autoFocus>{acceptValue}</Button>
        }
      </DialogActions>
    </Dialog>
  )
}