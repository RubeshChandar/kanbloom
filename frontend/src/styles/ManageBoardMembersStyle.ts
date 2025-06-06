import theme from "./MaterialTheme";

export const paperSx = {
    p: 4,
    borderRadius: 4,
    minWidth: { xs: '90vw', sm: 420 },
    maxWidth: 480,
    background: 'rgba(20, 21, 22, 0.85)',
    backdropFilter: 'blur(8px)',
    mx: 'auto',
    mt: 8,
    border: `2px solid ${theme.palette.custom.neon}`,
    boxShadow: `0 0 32px 0 ${theme.palette.custom.neon}44`,
    maxHeight: "80vh",
    overflowY: "auto",
};

export const titleSx = {
    color: theme.palette.custom.neon,
    letterSpacing: 1,
    mb: 2
};

export const searchInputSx = {
    bgcolor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: 2,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.custom.neon,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.custom.neon,
    },
    mb: 4,
};

export const memberListItemSx = {
    bgcolor: theme.palette.background.default,
    borderRadius: 2,
    mb: 1,
};

export const memberRemoveButtonSx = {
    color: theme.palette.error.main,
    bgcolor: "#212226",
    border: "1.5px solid red",
    transition: '0.15s',
    '&:hover': {
        bgcolor: theme.palette.error.main,
        color: theme.palette.background.paper,
    }
};

export const dividerSx = {
    my: 2,
    borderColor: theme.palette.custom.blueey
};

export const searchResultListItemSx = {
    bgcolor: "#18191b",
    borderRadius: 2,
    mb: 1,
    boxShadow: '0 1px 6px #0002',
};

export const searchResultAddButtonSx = {
    color: theme.palette.custom.neon,
    bgcolor: "#232526",
    border: `1.5px solid ${theme.palette.custom.neon}`,
    transition: '0.15s',
    '&:hover': {
        bgcolor: theme.palette.custom.neon,
        color: "#232526",
    }
};