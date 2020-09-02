// @flow

import * as React from 'react'
import { Text, View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import s from '../../locales/strings.js'
import { type Theme, type ThemeProps, cacheStyles, withTheme } from '../services/ThemeContext.js'
import { PrimaryButton, SecondaryButton } from '../themed/ThemedButtons.js'
import { ThemedModal } from '../themed/ThemedModal.js'
import { type AirshipBridge, IconCircle } from './modalParts.js'

type OwnProps = {
  bridge: AirshipBridge<string | null>,
  buttonLabel: string,
  message: string,
  title: string,
  walletName?: string
}

type State = {
  input: string
}

type Props = OwnProps & ThemeProps

class WalletListOptionCheckPasswordModalComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { input: '' }
  }

  onInputChange = (input: string) => {
    this.setState({ input })
  }

  render() {
    const { bridge, buttonLabel, message, theme, title, walletName } = this.props
    const styles = getStyles(theme)
    return (
      <ThemedModal bridge={bridge} onCancel={() => bridge.resolve(null)}>
        <IconCircle>
          <FontAwesome style={styles.icon} name="user-secret" color={theme.tileBackground} size={theme.rem(2)} />
        </IconCircle>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message.trim()}</Text>
          {walletName && <Text style={styles.walletName}>{walletName}</Text>}
          <TextField
            textColor={theme.primaryText}
            returnKeyType="go"
            baseColor={theme.primaryText}
            label={s.strings.confirm_password_text}
            onChangeText={this.onInputChange}
            value={this.state.input}
          />
        </View>
        <SecondaryButton label={s.strings.string_cancel_cap} onPress={() => bridge.resolve(null)} marginRem={0.5} />
        <PrimaryButton label={buttonLabel} onPress={() => bridge.resolve(this.state.input)} marginRem={0.5} />
      </ThemedModal>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.rem(1)
  },
  icon: {
    left: theme.rem(0.125)
  },
  title: {
    color: theme.primaryText,
    fontSize: theme.rem(1.25),
    fontFamily: theme.fontFaceDefault,
    textAlign: 'center',
    margin: theme.rem(0.25)
  },
  message: {
    color: theme.primaryText,
    fontSize: theme.rem(1),
    textAlign: 'center',
    fontFamily: theme.fontFaceDefault,
    marginBottom: 0
  },
  walletName: {
    color: theme.primaryText,
    fontSize: theme.rem(1),
    textAlign: 'center',
    fontFamily: theme.fontFaceBold
  }
}))

export const WalletListOptionCheckPasswordModal = withTheme(WalletListOptionCheckPasswordModalComponent)
