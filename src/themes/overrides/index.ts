import { Theme } from '@mui/material/styles';
import Button from './Button';
import Typography from './Typography';
import TextField from './TextField';
import Checkbox from '@/themes/overrides/Checkbox';

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Button(theme), Typography(), TextField(theme), Checkbox(theme));
}
